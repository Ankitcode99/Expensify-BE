import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth'; // Assuming auth middleware definition
import { ExpenseController } from '../controllers/expense.controller';
import { ExpenseDto, ExpenseSchema } from '../models/expense.model'; // Assuming ExpenseDto definition
import { validate } from '../middlewares/validate';

const expenseRouter = Router();
const expenseController = new ExpenseController(); // Assuming you have an instance of ExpenseController

// Create Expense (POST)
expenseRouter.post('/', authMiddleware, validate(ExpenseSchema), expenseController.createExpense);

// Get All Expenses (GET)
expenseRouter.get('/', authMiddleware, expenseController.getAllExpenses);

// Get Expense by ID (GET)
expenseRouter.get('/:id', authMiddleware, expenseController.getExpenseById);

// Update Expense (PUT)
expenseRouter.put('/:id', authMiddleware, validate(ExpenseSchema), expenseController.updateExpense);

// Delete Expense (DELETE)
expenseRouter.delete('/:id', authMiddleware, expenseController.deleteExpense);

export default expenseRouter;
