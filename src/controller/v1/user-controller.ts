/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Users from '../../db/schema/users';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { errorMessage, creationError } from '../../utils/utils';

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { email, first_name, last_name, alias, password } = req.body;

  const hash: string = await bcrypt.hash(password, 16);
  try {
    const user = await Users.create({
      data: {
        email,
        first_name,
        last_name,
        alias,
        password: hash,
      },
    });
    res.send(user);
  } catch (e: any) {
    creationError(e, res);
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    console.log('try');
    const user = await Users.findOne({ email });
    if (!user) {
      throw errorMessage(res, 'user not found');
    }
    console.log(user);

    const validPassword = await bcrypt.compare(password, user.data.password);

    if (!validPassword) {
      throw errorMessage(res, 'invalid password');
    }

    console.log(validPassword);
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.data.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );

    console.log(token);
    res.send({
      token: token,
      expiresIn: parseInt(process.env.EXPIRES_IN!),
    });
  } catch (e: any) {
    console.log('catch');
    errorMessage(res, e.message);
  }
};

export default {
  createUser,
  login,
};
