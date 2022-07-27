import { Application } from 'express';
import { userRouter } from './user-router';

const createRoutesV2 = (app: Application): void => {
  app.use('/api/v1/users', userRouter);
};

export default createRoutesV2;
