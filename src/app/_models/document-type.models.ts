import { DocumentTypeSelectDto } from "../_dtos/document-type-select.dto";

export class DocumentType {
  id: number;
  description: string;
  created_by: number;
  updated_by: number;
}

export class DocumentTypeResult {
  message: string;
  success: boolean;
  data: DocumentType;
  errors: any[]
}

export class DocumentTypeListResult {
  message: string;
  success: boolean;
  data: DocumentType[];
  errors: any[]
}

export class DocumentTypeListToLookup {
  message: string;
  success: boolean;
  data: DocumentTypeSelectDto[];
  errors: any[]
}
