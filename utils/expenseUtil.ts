import { ExpenseDto } from "../models/expense.model";

export function computeGroupByMonthAndYear(allExpenses: Map<string, ExpenseDto>, year: string): Map<string, ExpenseDto> {
    const result:Map<string, ExpenseDto> = new Map();

    allExpenses.forEach((v,k)=>{
        console.log(k, v);
    })

    return result;
}

export function computeGroupByYear(allExpenses: Map<string, ExpenseDto>):  Map<string, ExpenseDto> {
    const result:Map<string, ExpenseDto> = new Map();

    allExpenses.forEach((v,k)=>{
        console.log(k, v);
    })

    return result;
}

export function computeGroupByCategory(allExpenses: Map<string, ExpenseDto>):  Map<string, ExpenseDto> {
    const result:Map<string, ExpenseDto> = new Map();

    const categoryVsIdsMap:Map<string, string[]> = new Map();
    allExpenses.forEach((expenseObj, id)=>{
        const existingArr = categoryVsIdsMap.get(expenseObj.category) || [];
        existingArr.push(id);

        categoryVsIdsMap.set(expenseObj.category, existingArr);
    })

    return result;
}