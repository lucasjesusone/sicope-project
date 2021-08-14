export class Collaborator {
  id: number;
  education_level_id: number;
  sector_id: number;
  job_function_id: number;
  company_id: number;
  name: string;
  is_active: boolean;
  sex: string;
  marital_status: number;
  name_mother: string;
  name_father: string;
  name_husband_wife: string;
  name_children: string;
  date_birth: Date;
  zip_code: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  city_code: string;
  state: string;
  telephone: string;
  telephone_corporate: string;
  cell: string;
  whatsapp: string;
  email: string;
  cnh: string;
  cnh_category: string;
  identity: string;
  identity_date_emission: Date;
  cpf: string;
  pis: string;
  ctps: string;
  voter_card: string;
  voter_zone: string;
  voter_session: string;
  date_admission: Date;
  date_in: Date;
  date_demission: Date;
  created_by: number;
  updated_by: number;
}

export class CollaboratorResult {
  message: string;
  success: boolean;
  data: Collaborator;
  errors: any[]
}

export class CollaboratorListResult {
  message: string;
  success: boolean;
  data: Collaborator[];
  errors: any[]
}
