import { AccountAndServices } from './accountAndServices';
import { AccountSelectDto } from "../_dtos/account-select.dto";
import { Service } from "./service.models";

export class Account {
  id: number;
  account_type: number;
  name: string;
  fantasy_name: string;
  document_type: number;
  document: string;
  state_registration: string;
  municipal_registration: string;
  zip_code: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  city_code: string;
  state: string;
  telephone: string;
  cell: string;
  whatsapp: string;
  email: string;
  bank: string;
  bank_agency: string;
  bank_account: string;
  bank_account_type: number;
  comments: string;
  status: number;
  created_by: number;
  updated_by: number;
  accountAndServices: AccountAndServices[]
}

export class AccountResult {
  message: string;
  success: boolean;
  data: Account;
  errors: any[]
}

export class AccountListResult {
  message: string;
  success: boolean;
  data: Account[];
  errors: any[]
}

export class AccountListToLookup {
  message: string;
  success: boolean;
  data: AccountSelectDto[];
  errors: any[]
}
