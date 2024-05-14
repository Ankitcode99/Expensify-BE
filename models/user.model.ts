import {z} from "zod"


export const UserSchema = z.object({
    id: z.string().optional(),
    username: z
        .string({
            required_error: 'Name is required',
        })
        .trim()
        .min(3, 'Username should have atleast 3 characters'),
    email: z
        .string({
            required_error: 'Email is required',
        })
        .trim()
        .min(1, 'Email cannot be empty')
        .email('Invalid email'),
    password: z
        .string({
            required_error: 'Password is required',
        })
        .trim()
        .min(6, 'Password should have atleast 6 characters'),
    })

export type User = z.infer<typeof UserSchema>;
  
export type CreateUserDto = z.infer<typeof UserSchema>;

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .trim()
    .min(1, 'Email cannot be empty')
    .email('Invalid email'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .trim()
    .min(6, 'Password should have atleast 6 characters'),
});

export type LoginCredentials = z.infer<typeof LoginSchema>;


