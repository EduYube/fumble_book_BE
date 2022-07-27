/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Users from '../../db/schema/users';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { errorMessage } from '../../utils/utils';
import { mongo } from 'mongoose';

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
    if (e instanceof mongo.MongoError) {
      errorMessage(res, e.errmsg + 'mongoError');
    } else {
      errorMessage(res, e.message + 'createUserError');
    }
  }
};

export default {
  createUser,
};
