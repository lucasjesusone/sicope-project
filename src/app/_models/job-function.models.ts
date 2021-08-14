import { JobFunctionSelectDto } from "../_dtos/job-function-select.dto";

export class JobFunction {
  id: number;
  name: string;
  created_by: number;
  updated_by: number;
}

export class JobFunctionResult {
  message: string;
  success: boolean;
  data: JobFunction;
  errors: any[]
}

export class JobFunctionListResult {
  message: string;
  success: boolean;
  data: JobFunction[];
  errors: any[]
}

export class JobFunctionListToLookup {
  message: string;
  success: boolean;
  data: JobFunctionSelectDto[];
  errors: any[]
}
