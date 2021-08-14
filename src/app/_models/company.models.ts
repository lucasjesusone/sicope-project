import { CompanySelectDto } from "../_dtos/company-select.dto";

export class Company {
  id: number;
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
  is_active: boolean;
  invoice_reference: string;
  invoice_last_number: string;
  invoice_serie: string;
  token_homologation: string;
  token_prodution: string;
  email_server: string;
  email_port: string;
  email_user: string;
  email_password: string;
  special_tribute_regime: string;
  national_simple_optant: boolean;
  cultural_promoter: boolean;
  created_by: number;
  updated_by: number;
}

export class CompanyResult {
  message: string;
  success: boolean;
  data: Company;
  errors: any[]
}

export class CompanyListResult {
  message: string;
  success: boolean;
  data: Company[];
  errors: any[]
}

export class CompanyListToLookup {
  message: string;
  success: boolean;
  data: CompanySelectDto[];
  errors: any[]
}

