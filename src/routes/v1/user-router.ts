import { Router } from 'express';
import usersController from '../../controller/v1/user-controller';

export const userRouter = Router();

userRouter.post('/login', usersController.login);
userRouter.post('/create', usersController.createUser);
