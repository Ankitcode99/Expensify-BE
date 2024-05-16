import { ExpenseDto, ExpenseDtoWithUserId } from "../models/expense.model";

type  ExpenseDtoWithId = ExpenseDto & {id: string}

const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

export function computeGroupByMonthAndYear(userId, allExpenses: Map<string, ExpenseDtoWithUserId>, year: string): ExpenseDtoWithId[] {
    const result:any[] = [];
    const monthVsAmtMap:Map<number, number> = new Map();
    allExpenses.forEach((expenseObj, id)=>{
        if(expenseObj.userId === userId) {
            const expenseDate = expenseObj.date;
            if(expenseDate.split('-')[0] === year) {
                const currMonth = parseInt(expenseDate.split('-')[1])
                const currAmt:number = monthVsAmtMap.get(currMonth) || 0;
                monthVsAmtMap.set(currMonth, currAmt + expenseObj.amount)
            }
        }
    })

    const sortedKeys = Array.from(monthVsAmtMap.keys()).sort();
    const sortedMap = new Map(sortedKeys.map(key => [key, monthVsAmtMap.get(key)]));

    let id = 1
    sortedMap.forEach((amount, month)=>{
        result.push({
            id: id.toString(),
            month: months[month],
            amount: amount
        })
        id++;
    })

    return result;
}

export function computeGroupByYear(userId:string, allExpenses: Map<string, ExpenseDtoWithUserId>):  ExpenseDtoWithId[] {
    const result:any[] = [];
    const yearVsAmtMap:Map<number, number> = new Map();
    allExpenses.forEach((expenseObj, id)=>{
        if(expenseObj.userId === userId) {
            const expenseDate = expenseObj.date;
            
            const currYear = parseInt(expenseDate.split('-')[0])
            const currAmt:number = yearVsAmtMap.get(currYear) || 0;
            yearVsAmtMap.set(currYear, currAmt + expenseObj.amount)
            
        }
    })

    const sortedKeys = Array.from(yearVsAmtMap.keys()).sort();
    const sortedMap = new Map(sortedKeys.map(key => [key, yearVsAmtMap.get(key)]));


    let id = 1
    sortedMap.forEach((amount, year)=>{
        result.push({
            id: id.toString(),
            year: year,
            amount: amount
        })
        id++;
    })

    return result;
}

export function formatAllExpenses(userId: string, allExpenses: Map<string, ExpenseDtoWithUserId>) {
    const result:any[] = []
    allExpenses.forEach((expenseObj, id)=>{
        if(expenseObj.userId === userId) {
            result.push({
                id: id,
                category: expenseObj.category,
                amount: expenseObj.amount,
                date: expenseObj.date,
                description: expenseObj.description
            })
        }
    })
    return result
}

export function computeGroupByCategory(userId: string, allExpenses: Map<string, ExpenseDtoWithUserId>) {
    let result:any[] = [];
    const categoryVsIdsMap:Map<string, number> = new Map();
    allExpenses.forEach((expenseObj, id)=>{
        if(expenseObj.userId == userId) {
            const existingSum = categoryVsIdsMap.get(expenseObj.category) || 0;
            categoryVsIdsMap.set(expenseObj.category, existingSum+expenseObj.amount);    
        }
    })

    const sortedKeys = Array.from(categoryVsIdsMap.keys()).sort();
    const sortedMap = new Map(sortedKeys.map(key => [key, categoryVsIdsMap.get(key)]));

    let id=1
    sortedMap.forEach((expenseAmt, category)=>{
        result.push({
            id: id.toString(),
            category: category,
            amount: expenseAmt
        })
        id++;
    })

    return result;
}

export function computeLifetimeExpense(userId: string, allExpenses: Map<string, ExpenseDtoWithUserId>): number {
    let sum=0;
    allExpenses.forEach((expense, id) => {
        if(expense.userId === userId)
            sum+= expense.amount;
    })
    return sum;
}