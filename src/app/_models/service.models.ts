import { ServiceSelectDto } from "../_dtos/service-select.dto";

export class Service {
  id: number;
  name: string;
  description: string;
  created_by: number;
  updated_by: number;
}

export class ServiceResult {
  message: string;
  success: boolean;
  data: Service;
  errors: any[]
}

export class ServiceListResult {
  message: string;
  success: boolean;
  data: Service[];
  errors: any[]
}

export class ServiceListToLookup {
  message: string;
  success: boolean;
  data: ServiceSelectDto[];
  errors: any[]
}
