import { Response } from 'express';
import { mongo } from 'mongoose';

export const errorMessage = (res: Response, message: string): void => {
  res.status(401).send(message);
};

export const creationError = (e: any, res: Response) => {
  if (e instanceof mongo.MongoError) {
    errorMessage(res, e.errmsg + 'mongoError');
  } else {
    errorMessage(res, e.message + 'createUserError');
  }
};
