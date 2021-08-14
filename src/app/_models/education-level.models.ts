import { EducationLevelSelectDto } from "../_dtos/education-level-select.dto";

export class EducationLevel {
  id: number;
  description: string;
  created_by: number;
  updated_by: number;
}

export class EducationLevelResult {
  message: string;
  success: boolean;
  data: EducationLevel;
  errors: any[]
}

export class EducationLevelListResult {
  message: string;
  success: boolean;
  data: EducationLevel[];
  errors: any[]
}

export class EducationLevelListToLookup {
  message: string;
  success: boolean;
  data: EducationLevelSelectDto[];
  errors: any[]
}
