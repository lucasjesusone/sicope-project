export class Config {
  constructor() { }

  yesNo = [
    { id: 0, name: 'Não' },
    { id: 1, name: 'Sim' },
  ];

  categoryCNH = [
    { id: 'A', name: 'A' },
    { id: 'B', name: 'B' },
    { id: 'C', name: 'C' },
    { id: 'D', name: 'D' },
    { id: 'E', name: 'E' },
  ];

  creditType = [
    { id: 0, name: 'Moeda' },
    { id: 1, name: 'Dinheiro' },
  ];

  yesNoBoolean = [
    { id: true, name: 'Sim' },
    { id: false, name: 'Não' },
  ];

  Sex = [
    { id: 0, name: 'Masculino' },
    { id: 1, name: 'Feminino' },
  ];

  maritalStatus = [
    { id: 0, name: 'Solteiro(a)' },
    { id: 1, name: 'Casado(a)' },
    { id: 2, name: 'Viúvo(a)' },
    { id: 3, name: 'Separado(a) judicialmente' },
    { id: 4, name: 'Divorciado' },
  ];

  accountType = [
    { id: 0, name: 'Cliente' },
    { id: 1, name: 'Fornecedor' },
    { id: 2, name: 'Comercial' },
  ];

  accountDocumentType = [
    { id: 0, name: 'Jurídica' },
    { id: 1, name: 'Física' },
  ];

  accountStatus = [
    { id: 0, name: 'Ativo' },
    { id: 1, name: 'Bloqueado' },
    { id: 2, name: 'Inadimplente' },
  ];

  bankAccountType = [
    { id: 0, name: 'Conta corrente' },
    { id: 1, name: 'Conta poupança' },
    { id: 2, name: 'Conta salário' },
    { id: 9, name: 'Outras' },
  ];

  userNivel = [
    { id: 0, name: 'Administrador' },
    { id: 1, name: 'Diretoria' },
    { id: 2, name: 'Gerencia' },
    { id: 3, name: 'Usuário' },
    { id: 4, name: 'Visitante' }
  ];

  especialRegime = [
    { id: 1, name: 'Microempresa municipal' },
    { id: 2, name: 'Estimativa' },
    { id: 3, name: 'Sociedade de profissionais' },
    { id: 4, name: 'Cooperativa' },
    { id: 5, name: 'MEI - Simples Nacional' },
    { id: 6, name: 'ME EPP- Simples Nacional' }
  ]
}
