import { Application } from 'express';
import { userRouter } from './user-router';
import { characterRouter } from './character-router';

const createRoutesV1 = (app: Application): void => {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/characters', characterRouter);
};

export default createRoutesV1;
