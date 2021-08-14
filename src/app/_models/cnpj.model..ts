export class Cnpj {
  fantasia: string;
  nome: string;
  abertura: string;
  bairro: string;
  cep: string;
  complemento: string;
  municipio: string;
  logradouro: string;
  numero: string;
  email: string;
  uf: string;
}

export class CnpjResult {
  message: string;
  success: boolean;
  data: Cnpj;
  errors: any[]
}
