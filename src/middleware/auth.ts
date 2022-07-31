/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-namespace */

import { NextFunction, Request, Response } from 'express';
import { errorMessage } from '../utils/utils';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    export interface Request {
      session: {
        userId: string;
      };
    }
  }
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers;

    if (!token) {
      errorMessage(res, 'Token Unauth');
    }

    const { userId } = jwt.verify(
      token as string,
      process.env.JWT_SECRET!
    ) as any;
    req.session = {
      userId: userId,
    };
    next();
  } catch (e: any) {
    errorMessage(res, e);
  }
};
