export class Cep {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

export class CepResult {
  message: string;
  success: boolean;
  data: Cep;
  errors: any[]
}
