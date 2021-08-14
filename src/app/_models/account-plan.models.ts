import { AccountPlanSelectDto } from "../_dtos/account-plan-select.dto";

export class AccountPlan {
  id: number;
  code: string;
  description: string;
  created_by: number;
  updated_by: number;
}

export class AccountPlanResult {
  message: string;
  success: boolean;
  data: AccountPlan;
  errors: any[]
}

export class AccountPlanListResult {
  message: string;
  success: boolean;
  data: AccountPlan[];
  errors: any[]
}

export class AccountPlanListToLookup {
  message: string;
  success: boolean;
  data: AccountPlanSelectDto[];
  errors: any[]
}
