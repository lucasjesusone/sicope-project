export class User {
  id: number;
  user_group_id: number;
  user_group_name: string;
  name: string;
  user_type: number;
  email: string;
  login: string;
  password: string;
  is_active: boolean;
  roles: string;
  created_by: number;
  updated_by: number;
}

export class UserResult {
  message: string;
  success: boolean;
  data: User;
  errors: any[]
}

export class UserListResult {
  message: string;
  success: boolean;
  data: User[];
  errors: any[]
}

export class UserLogin {
  login: string;
  password: string;
}

export class UserDataToken {
  id: number;
  user_group_id: number;
  user_group_name: string;
  name: string;
  user_type: number;
  email: string;
  roles: [];
  token: string;
}

export class UserLogged {
  message: string;
  success: boolean;
  data: UserDataToken;
  errors: any[]
}
