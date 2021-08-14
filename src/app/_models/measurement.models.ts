export class Measurement {
  created_by: number;
  updated_by: number;
}

export class MeasurementResult {
  message: string;
  success: boolean;
  data: Measurement;
  errors: any[]
}

export class MeasurementListResult {
  message: string;
  success: boolean;
  data: Measurement[];
  errors: any[]
}
