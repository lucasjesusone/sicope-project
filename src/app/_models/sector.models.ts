import { SectorSelectDto } from "../_dtos/sector-select.dto";

export class Sector {
  id: number;
  description: string;
  created_by: number;
  updated_by: number;
}

export class SectorResult {
  message: string;
  success: boolean;
  data: Sector;
  errors: any[]
}

export class SectorListResult {
  message: string;
  success: boolean;
  data: Sector[];
  errors: any[]
}

export class SectorListToLookup {
  message: string;
  success: boolean;
  data: SectorSelectDto[];
  errors: any[]
}
