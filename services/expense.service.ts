import { ExpenseDto, ExpenseDtoWithUserId } from '../models/expense.model'; // Assuming expense model definition
import {v4 as uuidv4} from "uuid";
import { computeGroupByCategory, computeGroupByMonthAndYear, computeGroupByYear, computeLifetimeExpense, formatAllExpenses } from '../utils/expenseUtil';
export class ExpenseService {

  private static expensesDb: Map<string, ExpenseDtoWithUserId> = new Map();
  
  static async createExpense(userId: string,expense: ExpenseDto): Promise<string> {
    const expenseId = uuidv4();

    this.expensesDb.set(expenseId, {...expense, userId: userId})

    return expenseId; // Replace with actual creation logic and return the created expense
  }

  static async getAllExpenses(userId: string, groupBy: string|undefined = undefined, year: string|undefined = undefined): Promise<any[]> {
	let result: any[] = [];
	switch(groupBy) {
		case "MONTH":
			if(!year)
				throw new Error("Year not provided!")
			result = computeGroupByMonthAndYear(userId, this.expensesDb, year!)
			break;
		case "YEAR":
			result = computeGroupByYear(userId, this.expensesDb);
			break;
		case "CATEGORY":
			result = computeGroupByCategory(userId, this.expensesDb);
			break;
		default: result = formatAllExpenses(userId, this.expensesDb)
	}
    return result; // Replace with actual retrieval logic and return an array of expenses
  }

  static async getExpenseById(userId:string, id: string): Promise<ExpenseDto | null> {

    const expenseObj: ExpenseDtoWithUserId|null =  this.expensesDb.get(id) || null; 
    if(expenseObj && expenseObj.userId == userId) {
      return expenseObj as ExpenseDto
    }
    return null
  }

  static async getTotalExpense(userId): Promise<number> {
    return computeLifetimeExpense(userId, this.expensesDb);
  }
  static async updateExpense(userId: string, id: string, updatedExpense: ExpenseDto): Promise<ExpenseDto | null> {
    if(this.expensesDb.has(id)) {
        this.expensesDb.set(id, {...updatedExpense, userId: userId});
        return updatedExpense;
    }
    return null; // Replace with actual logic and return updated expense object or null if not found
  }

  static async deleteExpense(userId:string, id: string): Promise<boolean> {
    // Implement logic to delete an expense
    if(this.expensesDb.has(id) && (this.expensesDb.get(id))?.userId == userId) {
      return this.expensesDb.delete(id)
    }
	return false
  }
}
