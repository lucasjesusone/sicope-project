export class Invoice {
  id: number;
  invoice_number: string;
  date_emission: Date;
  operation_nature: string;
  special_tribute_regime: string;
  national_simple_optant: boolean;
  cultural_promoter: boolean;
  taxation_rps: string;
  work_code: string;
  art: string;
  rps_number_replaced: string;
  rps_series_replaced: string;
  rps_type_replaced: string;
  provider_id: number;
  taker_id: number;
  value_services: number;
  value_deductions: number;
  value_pis: number;
  value_cofins: number;
  value_inss: number;
  value_ir: number;
  value_csll: number;
  value_iss: number;
  value_iss_withheld: number;
  other_reviews: number;
  calculation_base: number;
  aliquot: number;
  unconditioned_discount: number;
  conditioned_discount: number;
  value_liquid: number;
  value_total: number;
  list_iten_service: string;
  cnae_code: string;
  municipal_tax_code: string;
  discrimination: string;
  city_code: string;
  percentage_total_tributes: number;
  total_source_taxes: number;
  created_by: number;
  updated_by: number;
}

export class InvoiceResult {
  message: string;
  success: boolean;
  data: Invoice;
  errors: any[]
}

export class InvoiceListResult {
  message: string;
  success: boolean;
  data: Invoice[];
  errors: any[]
}

