export class PayRoll {
  created_by: number;
  updated_by: number;
}

export class PayRollResult {
  message: string;
  success: boolean;
  data: PayRoll;
  errors: any[]
}

export class PayRollListResult {
  message: string;
  success: boolean;
  data: PayRoll[];
  errors: any[]
}
