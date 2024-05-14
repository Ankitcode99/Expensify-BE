import {z} from "zod"

export const ExpenseSchema = z.object({
    category: z
        .string({
            required_error: 'Expense type is required',
        })
        .trim()
        .min(3, 'Expense type should have atleast 3 characters'),
    amount: z
        .number({
            required_error: 'Expense amount is required',
        })
        .positive('Amount must be a positive number'),
    date: z.date({
        required_error: 'Expense date is required',
    }),
    description: z.string().optional()
  });

export type ExpenseDto = z.infer<typeof ExpenseSchema>;

