import { ExpenseDto } from '../models/expense.model'; // Assuming expense model definition
import {v4 as uuidv4} from "uuid";
import { computeGroupByCategory, computeGroupByMonthAndYear, computeGroupByYear } from '../utils/expenseUtil';
export class ExpenseService {

  private static expensesDb: Map<string, ExpenseDto> = new Map();
  
  static async createExpense(expense: ExpenseDto): Promise<string> {
    const expenseId = uuidv4();

    this.expensesDb.set(expenseId, expense)

    return expenseId; // Replace with actual creation logic and return the created expense
  }

  static async getAllExpenses(groupBy: string|undefined = undefined, year: string|undefined = undefined): Promise<Map<string, ExpenseDto>> {
	let result: Map<string, ExpenseDto> = new Map();
	switch(groupBy) {
		case "MONTH":
			if(!year)
				throw new Error("Year not provided!")
			result = computeGroupByMonthAndYear(this.expensesDb, year!)
			break;
		case "YEAR":
			result = computeGroupByYear(this.expensesDb);
			break;
		case "CATEGORY":
			result = computeGroupByCategory(this.expensesDb);
			break;
		default: result = this.expensesDb
	}
    return result; // Replace with actual retrieval logic and return an array of expenses
  }

  static async getExpenseById(id: string): Promise<ExpenseDto | null> {
    return this.expensesDb.get(id) || null; 
  }

  static async updateExpense(id: string, updatedExpense: ExpenseDto): Promise<ExpenseDto | null> {
    if(this.expensesDb.has(id)) {
        this.expensesDb.set(id, updatedExpense);
        return updatedExpense;
    }
    return null; // Replace with actual logic and return updated expense object or null if not found
  }

  static async deleteExpense(id: string): Promise<boolean> {
    // Implement logic to delete an expense
    if(this.expensesDb.has(id)) {
		return this.expensesDb.delete(id)
    }
	return false
  }
}
