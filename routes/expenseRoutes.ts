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


expenseRouter.get('/total', authMiddleware, expenseController.getTotalExpenses);

// Update Expense (PUT)
expenseRouter.put('/:id', authMiddleware, validate(ExpenseSchema), expenseController.updateExpense);

// Delete Expense (DELETE)
expenseRouter.delete('/:id', authMiddleware, expenseController.deleteExpense);

export default expenseRouter;


/**
 * 
 * 1. Which database to use  - SQL or NoSql
 * 
 * - SQL (MySql or PostgreSql)
 * 
 * 1. STRUCTURED Format
 * 2. Complex relationships betweens data
 * 3. Referential Integrity - (Foreign Keys)
 * 
 * 
 * NoSQL 
 * 1. Schema of the data is changing frequently
 * 2. Not many relationships between data
 */


/**
 *  Routes(Entry points of our application) ->  MIDDLEWARE(authentication & authorization)   -> Controllers(validations of input) ->  Services(Business logic & code logic is implemented)
 * 
 * 1. HTTP Status Codes
 * 2. authentication & authorization - 401 & 403 error
 */