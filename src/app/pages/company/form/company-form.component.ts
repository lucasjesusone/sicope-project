import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertModalService } from "src/app/_components/alert-modal.service";
import { Company, CompanyResult } from "src/app/_models/company.models";
import { CepResult } from "src/app/_models/cep.model";
import { CnpjResult } from "src/app/_models/cnpj.model.";
import { CompanyService } from "src/app/_services/company.service";
import { SharedService } from "src/app/_services/shared.service";
import { Config } from "src/app/_utils/config";

@Component({
  selector: "app-company-form",
  templateUrl: "company-form.component.html"
})
export class CompanyFormComponent implements OnInit {
  config = new Config();

  formMain: FormGroup;
  submitted: boolean = false;
  Inserting: boolean = false;
  statusSelected: number = 0;
  company: Company;
  companyId: number;
  zipCode: number;
  cpfcnpj: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: CompanyService,
    private serviceShared: SharedService,
    private modal: AlertModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.companyId = this.activeRoute.snapshot.params['id'];
    this.formMain = this.fb.group({
      id: [''],
      name: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(100), Validators.required])],
      fantasy_name: [''],
      document_type: 0,
      document: ['', Validators.compose([Validators.required])],
      state_registration: [''],
      municipal_registration: [''],
      zip_code: ['', Validators.compose([Validators.required])],
      street: ['', Validators.compose([Validators.required])],
      number: ['', Validators.compose([Validators.required])],
      complement: [''],
      neighborhood: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      city_code: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      telephone: [''],
      cell: ['', Validators.compose([Validators.required])],
      whatsapp: [''],
      email: ['', Validators.compose([Validators.required])],
      is_active: true,
      invoice_reference: [''],
      invoice_last_number: [''],
      invoice_serie: [''],
      token_homologation: [''],
      token_prodution: [''],
      special_tribute_regime: [0],
      national_simple_optant: false,
      cultural_promoter: false,
      email_server: [''],
      email_port: [''],
      email_user: [''],
      email_password: ['']
    })

    this.Inserting = true;
    if (this.companyId > 0) {
      this.Inserting = false;
      this.service.getCompanyById(this.companyId).subscribe((result: CompanyResult) => {
        this.formMain.patchValue({
          id: result.data.id,
          name: result.data.name,
          fantasy_name: result.data.fantasy_name,
          document_type: result.data.document_type,
          document: result.data.document,
          state_registration: result.data.state_registration,
          municipal_registration: result.data.municipal_registration,
          zip_code: result.data.zip_code,
          street: result.data.street,
          number: result.data.number,
          complement: result.data.complement,
          neighborhood: result.data.neighborhood,
          city: result.data.city,
          city_code: result.data.city_code,
          state: result.data.state,
          telephone: result.data.telephone,
          cell: result.data.cell,
          whatsapp: result.data.whatsapp,
          email: result.data.email,
          is_active: result.data.is_active,
          invoice_reference: result.data.invoice_reference,
          invoice_last_number: result.data.invoice_last_number,
          invoice_serie: result.data.invoice_serie,
          token_homologation: result.data.token_homologation,
          token_prodution: result.data.token_prodution,
          special_tribute_regime: result.data.special_tribute_regime,
          national_simple_optant: result.data.national_simple_optant,
          cultural_promoter: result.data.cultural_promoter,
          email_server: result.data.email_server,
          email_port: result.data.email_port,
          email_user: result.data.email_user,
          email_password: result.data.email_password,
        });
      });
    }
  }

  getByZipCode() {
    this.zipCode = this.formMain.get("zip_code")?.value;
    this.serviceShared.getByZipCode(this.zipCode).subscribe(
      (result: CepResult) => {
        this.formMain.patchValue({
          zip_code: result.data.cep,
          street: result.data.logradouro,
          number: '',
          complement: result.data.complemento,
          neighborhood: result.data.bairro,
          city: result.data.localidade,
          city_code: result.data.ibge,
          state: result.data.uf,
        });
      },
      error => this.modal.showAlertDanger(error.errors)
    );
  }

  getByDocument() {
    this.cpfcnpj = this.formMain.get("document")?.value;
    this.serviceShared.getByDocument(this.cpfcnpj).subscribe(
      (result: CnpjResult) => {
        this.formMain.patchValue({
          name: result.data.nome,
          fantasy_name: result.data.fantasia,
          document_type: 0,
          state_registration: '',
          municipal_registration: '',
          zip_code: result.data.cep,
          street: result.data.logradouro,
          number: result.data.numero,
          complement: result.data.complemento,
          neighborhood: result.data.bairro,
          city: result.data.municipio,
          state: result.data.uf,
          email: result.data.email,
        });
      },
      error => this.modal.showAlertDanger(error.errors)
    );
  }

  onNew() {
    this.formMain.patchValue({
      id: '',
      name: '',
      fantasy_name: '',
      document_type: 0,
      document: '',
      state_registration: '',
      municipal_registration: '',
      zip_code: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      city_code: '',
      state: '',
      telephone: '',
      cell: '',
      whatsapp: '',
      email: '',
      is_active: true,
      invoice_reference: '',
      invoice_last_number: '',
      invoice_serie: '',
      token_homologation: '',
      token_prodution: '',
      special_tribute_regime: 0,
      national_simple_optant: false,
      cultural_promoter: false,
      email_server: '',
      email_port: '',
      email_user: '',
      email_password: ''
    });
    this.Inserting = true;
  }

  onClose() {
    this.router.navigate(["companies"]);
  }

  onSubmit() {
    this.submitted = true;
    if (this.formMain.invalid) return;
    this.company = new Company();
    this.company.id = this.formMain.get("id").value;
    this.company.name = this.formMain.get("name").value;
    this.company.fantasy_name = this.formMain.get("fantasy_name").value;
    this.company.document_type = this.formMain.get("document_type").value;
    this.company.document = this.formMain.get("document").value.replace(".", "").replace("/", "")
    this.company.state_registration = this.formMain.get("state_registration").value;
    this.company.municipal_registration = this.formMain.get("municipal_registration").value;
    this.company.zip_code = this.formMain.get("zip_code").value.replace(".", "").replace("-", "")
    this.company.street = this.formMain.get("street").value;
    this.company.number = this.formMain.get("number").value;
    this.company.complement = this.formMain.get("complement").value;
    this.company.neighborhood = this.formMain.get("neighborhood").value;
    this.company.city = this.formMain.get("city").value;
    this.company.city_code = this.formMain.get("city_code").value;
    this.company.state = this.formMain.get("state").value;
    this.company.telephone = this.formMain.get("telephone").value;
    this.company.cell = this.formMain.get("cell").value;
    this.company.whatsapp = this.formMain.get("whatsapp").value;
    this.company.email = this.formMain.get("email").value;
    this.company.is_active = this.formMain.get("is_active").value;
    this.company.invoice_reference = this.formMain.get("invoice_reference").value;
    this.company.invoice_last_number = this.formMain.get("invoice_last_number").value;
    this.company.invoice_serie = this.formMain.get("invoice_serie").value;
    this.company.token_homologation = this.formMain.get("token_homologation").value;
    this.company.token_prodution = this.formMain.get("token_prodution").value;
    this.company.special_tribute_regime = this.formMain.get("special_tribute_regime").value;
    this.company.national_simple_optant = this.formMain.get("national_simple_optant").value;
    this.company.cultural_promoter = this.formMain.get("cultural_promoter").value;
    this.company.email_server = this.formMain.get("email_server").value;
    this.company.email_port = this.formMain.get("email_port").value;
    this.company.email_user = this.formMain.get("email_user").value;
    this.company.email_password = this.formMain.get("email_password").value;
    if (this.Inserting) {
      this.company.created_by = 1;
      this.service.postCompany(this.company).subscribe(
        (resultServer: any) => {
          if (resultServer.success === true) {
            this.formMain.patchValue({ id: resultServer.data.id });
            this.Inserting = false;
            this.modal.showAlertSuccess(resultServer.message);
          } else {
            this.Inserting = true;
            this.modal.showAlertDanger(resultServer.message);
          }
        },
        error => this.modal.showAlertDanger(error.errors)
      )
    } else {
      this.company.updated_by = 1;
      this.service.putCompany(this.company).subscribe(
        (resultServer: any) => {
          if (resultServer.success === true) {
            this.Inserting = false;
            this.modal.showAlertSuccess(resultServer.message);
          } else {
            this.Inserting = true;
            this.modal.showAlertDanger(resultServer.message);
          }
        },
        error => this.modal.showAlertDanger(error.errors)
      );
    }
  }
}
