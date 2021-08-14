export class PaymentMethod {
  id: number;
  description: string;
  created_by: number;
  updated_by: number;
}

export class PaymentMethodResult {
  message: string;
  success: boolean;
  data: PaymentMethod;
  errors: any[]
}

export class PaymentMethodListResult {
  message: string;
  success: boolean;
  data: PaymentMethod[];
  errors: any[]
}
