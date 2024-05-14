import { Router } from 'express';
import { UserController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { LoginSchema, UserSchema } from '../models/user.model';
const authRouter = Router();

// Signup route
authRouter.post('/signup', validate(UserSchema) , UserController.signup);

// Login route
authRouter.post('/login', validate(LoginSchema), UserController.login);


export default authRouter;
