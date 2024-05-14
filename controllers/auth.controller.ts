import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../models/user.model';

export class UserController {
  static async signup(req: Request, res: Response) {
    try {
      const payload: CreateUserDto = req.body;
      const newUserCreationResult = await AuthService.signup(payload);
      res.status(201).json({
        data: newUserCreationResult.userId,
        message: "User created successfully"
      });
    } catch (error) {
        res.status(401).json({message: error.message})
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const payload = req.body;
      const token = await AuthService.login(payload);
      res.json({ token: token });
    } catch (error) {
       res.status(401).json({message: error.message})
    }
  }

}
