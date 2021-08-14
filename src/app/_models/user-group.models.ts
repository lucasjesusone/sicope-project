export class UserGroup {
  id: number;
  name: string;
  created_by: number;
  updated_by: number;
}

export class UserGroupResult {
  message: string;
  success: boolean;
  data: UserGroup;
  errors: any[]
}

export class UserGroupListResult {
  message: string;
  success: boolean;
  data: UserGroup[];
  errors: any[]
}

