export class Flow {
  created_by: number;
  updated_by: number;
}

export class FlowResult {
  message: string;
  success: boolean;
  data: Flow;
  errors: any[]
}

export class FlowListResult {
  message: string;
  success: boolean;
  data: Flow[];
  errors: any[]
}
