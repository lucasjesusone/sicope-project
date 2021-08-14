import { AccountAndServices } from './../../../_models/accountAndServices';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NewServiceModalComponent } from './../../../_components/new-service-modal/new-service-modal.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from 'src/app/_components/alert-modal.service';
import {
  Account,
  AccountListResult,
  AccountResult,
} from 'src/app/_models/account.models';
import { CepResult } from 'src/app/_models/cep.model';
import { CnpjResult } from 'src/app/_models/cnpj.model.';
import { AccountService } from 'src/app/_services/account.service';
import { SharedService } from 'src/app/_services/shared.service';
import { Config } from 'src/app/_utils/config';
@Component({
  selector: 'app-account-form',
  templateUrl: 'account-form.component.html',
})
export class AccountFormComponent implements OnInit {
  config = new Config();
  totalRecords: number;
  accounts: AccountAndServices[]
  formSearch: FormGroup;
  error: any;
  formMain: FormGroup;
  submitted: boolean = false;
  Inserting: boolean = false;
  statusSelected: number = 0;
  account: Account;
  accountId: number;
  zipCode: number;
  cpfcnpj: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: AccountService,
    private serviceShared: SharedService,
    private modal: AlertModalService,
    private fb: FormBuilder,
    private bsModalService: BsModalService
  ) {}

  ngOnInit() {
    this.onSearch()
    this.accountId = this.activeRoute.snapshot.params['id'];
    this.formMain = this.fb.group({
      id: [''],
      account_type: [0],
      name: [
        '',
        [
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.required,
        ],
      ],
      fantasy_name: [''],
      document_type: [0],
      document: ['', Validators.required],
      state_registration: [''],
      municipal_registration: [''],
      zip_code: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      city_code: ['', Validators.required],
      state: ['', Validators.required],
      telephone: [''],
      cell: ['', Validators.required],
      whatsapp: [''],
      email: ['', Validators.required],
      bank: [''],
      bank_agency: [''],
      bank_account: [''],
      bank_account_type: [0],
      comments: [''],
      status: [0],
      accountAndServices: this.fb.group({
        value: ['']
      })
    });
    console.log(this.formMain.value)
    this.Inserting = true;
    if (this.accountId > 0) {
      this.Inserting = false;
      this.service
        .getAccountById(this.accountId)
        .subscribe((result: AccountResult) => {
          this.formMain.patchValue({
            id: result.data.id,
            account_type: result.data.account_type,
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
            bank: result.data.bank,
            bank_agency: result.data.bank_agency,
            bank_account: result.data.bank_account,
            bank_account_type: result.data.bank_account_type,
            comments: result.data.comments,
            status: result.data.status,
            accountAndServices: result.data.accountAndServices
          });
        });
    }
  }

  onSearch() {
    var accountFilter = '';
    this.service.getResultAccounts(accountFilter).subscribe(
      (result: AccountListResult) => {
        this.totalRecords = result.data.length;
        this.accounts = result.data[0].accountAndServices;        
      },
      (error: any) => {
        this.error = error;
        this.totalRecords = 0;
        this.accounts = null;
      }
    );
  }

  update(account: Account) {
    this.router.navigate(["accounts/form/" + account.id.toString()]);
  }

  openDialog() {
    const bsModalRef: BsModalRef = this.bsModalService.show(
      NewServiceModalComponent
    );
  }

  getByZipCode() {
    this.zipCode = this.formMain.get('zip_code')?.value;
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
      (error) => this.modal.showAlertDanger(error.errors)
    );
  }

  getByDocument() {
    this.cpfcnpj = this.formMain.get('document')?.value;
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
      (error) => this.modal.showAlertDanger(error.errors)
    );
  }

  onNew() {
    this.formMain.patchValue({
      id: '',
      account_type: 0,
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
      bank: '',
      bank_agency: '',
      bank_account: '',
      bank_account_type: 0,
      comments: '',
      status: 0,
    });
    
    this.Inserting = true;
  }

  onClose() {
    this.router.navigate(['accounts']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.formMain.invalid) return;
    this.account = new Account();
    this.account.id = this.formMain.get('id').value;
    this.account.account_type = this.formMain.get('account_type').value;
    this.account.name = this.formMain.get('name').value;
    this.account.fantasy_name = this.formMain.get('fantasy_name').value;
    this.account.document_type = this.formMain.get('document_type').value;
    this.account.document = this.formMain
      .get('document')
      .value.replace('.', '')
      .replace('/', '');
    this.account.state_registration =
      this.formMain.get('state_registration').value;
    this.account.municipal_registration = this.formMain.get(
      'municipal_registration'
    ).value;
    this.account.zip_code = this.formMain
      .get('zip_code')
      .value.replace('.', '')
      .replace('-', '');
    this.account.street = this.formMain.get('street').value;
    this.account.number = this.formMain.get('number').value;
    this.account.complement = this.formMain.get('complement').value;
    this.account.neighborhood = this.formMain.get('neighborhood').value;
    this.account.city = this.formMain.get('city').value;
    this.account.city_code = this.formMain.get('city_code').value;
    this.account.state = this.formMain.get('state').value;
    this.account.telephone = this.formMain.get('telephone').value;
    this.account.cell = this.formMain.get('cell').value;
    this.account.whatsapp = this.formMain.get('whatsapp').value;
    this.account.email = this.formMain.get('email').value;
    this.account.bank = this.formMain.get('bank').value;
    this.account.bank_agency = this.formMain.get('bank_agency').value;
    this.account.bank_account = this.formMain.get('bank_account').value;
    this.account.bank_account_type =
      this.formMain.get('bank_account_type').value;
    this.account.comments = this.formMain.get('comments').value;
    this.account.status = this.formMain.get('status').value;
    if (this.Inserting) {
      this.account.created_by = 1;
      this.service.postAccount(this.account).subscribe(
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
        (error) => this.modal.showAlertDanger(error.errors)
      );
    } else {
      this.account.updated_by = 1;
      this.service.putAccount(this.account).subscribe(
        (resultServer: any) => {
          if (resultServer.success === true) {
            this.Inserting = false;
            this.modal.showAlertSuccess(resultServer.message);
          } else {
            this.Inserting = true;
            this.modal.showAlertDanger(resultServer.message);
          }
        },
        (error) => this.modal.showAlertDanger(error.errors)
      );
    }
  }
}
