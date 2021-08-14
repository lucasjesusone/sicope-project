export class Expense {
  id: number;
  description: string;
  created_by: number;
  updated_by: number;
}

export class ExpenseResult {
  message: string;
  success: boolean;
  data: Expense;
  errors: any[]
}

export class ExpenseListResult {
  message: string;
  success: boolean;
  data: Expense[];
  errors: any[]
}
