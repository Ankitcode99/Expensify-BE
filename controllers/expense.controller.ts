import { Request, Response } from 'express';
import { ExpenseService } from '../services/expense.service';
import { ExpenseDto } from '../models/expense.model';

export class ExpenseController {
  
  async createExpense(req: Request, res: Response) {
    try {
      const newExpense: ExpenseDto = req.body;
      const createdExpenseId: string = await ExpenseService.createExpense(newExpense);
      res.status(201).json({data: createdExpenseId, message: "Expense added successfully!"});
    } catch (error) {
      console.error('Error creating expense:', error);
      res.status(500).json({data: null, message:"Some error occured while adding expense"});
    }
  }

  async getAllExpenses(req: Request, res: Response) {
    try {
      const {groupBy, year} = req.query as any;
      const expenses = await ExpenseService.getAllExpenses(groupBy, year);
      res.status(200).json(expenses);
    } catch (error) {
      console.error('Error retrieving expenses:', error);
      res.status(500).json({data: null, message:"Some error occured while retrieving expenses"});
    }
  }

  async getExpenseById(req: Request, res: Response) {
    const expenseId = req.params.id;
    try {
      const expense = await ExpenseService.getExpenseById(expenseId);
      if (expense) {
        res.json(expense);
      } else {
        res.status(404).json({ message: 'Expense not found' });
      }
    } catch (error) {
      console.error('Error retrieving expense:', error);
      res.status(500).json({data: null, message:"Some error occured while retrieving expense"});
    }
  }

  async updateExpense(req: Request, res: Response) {
    const expenseId = req.params.id;
    const updatedExpense: ExpenseDto = req.body;
    try {
      const updatedExpenseObject = await ExpenseService.updateExpense(expenseId, updatedExpense);
      if (updatedExpenseObject) {
        res.json(updatedExpenseObject);
      } else {
        res.status(404).json({ message: 'Expense not found' });
      }
    } catch (error) {
      console.error('Error updating expense:', error);
      res.status(500).json({data: null, message:"Some error occured while updating expenses"});
    }
  }

  async deleteExpense(req: Request, res: Response) {
    const expenseId = req.params.id;
    try {
      const updatedExpenseObject = await ExpenseService.deleteExpense(expenseId);
      if (updatedExpenseObject) {
        res.json(updatedExpenseObject);
      } else {
        res.status(404).json({ message: 'Expense not found' });
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      res.status(500).json({data: null, message:"Some error occured while deleting expenses"});
    }
  }
}
