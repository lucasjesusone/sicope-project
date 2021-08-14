export class ManagerialNature {
  id: number;
  description: string;
  created_by: number;
  updated_by: number;
}

export class ManagerialNatureResult {
  message: string;
  success: boolean;
  data: ManagerialNature;
  errors: any[]
}

export class ManagerialNatureListResult {
  message: string;
  success: boolean;
  data: ManagerialNature[];
  errors: any[]
}
