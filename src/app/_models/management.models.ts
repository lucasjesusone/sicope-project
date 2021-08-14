export class Management {
  id: number;
  description: string;
  initials: string;
  path_image: string;
  is_active: boolean;
  created_by: number;
  updated_by: number;
}

export class ManagementResult {
  message: string;
  success: boolean;
  data: Management;
  errors: any[]
}

export class ManagementListResult {
  message: string;
  success: boolean;
  data: Management[];
  errors: any[]
}
