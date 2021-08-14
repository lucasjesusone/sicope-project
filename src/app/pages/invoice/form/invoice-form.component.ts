import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbCalendar, NgbDateStruct, NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";

import { AlertModalService } from "src/app/_components/alert-modal.service";
import { AccountSelectDto } from "src/app/_dtos/account-select.dto";
import { CompanySelectDto } from "src/app/_dtos/company-select.dto";
import { AccountListToLookup } from "src/app/_models/account.models";
import { CompanyListToLookup } from "src/app/_models/company.models";
import { Invoice, InvoiceResult } from "src/app/_models/invoice.models";
import { AccountService } from "src/app/_services/account.service";
import { CompanyService } from "src/app/_services/company.service";
import { InvoiceService } from "src/app/_services/invoice.service";
import { Config } from "src/app/_utils/config";

@Component({
  selector: "app-invoice-form",
  templateUrl: "invoice-form.component.html"
})
export class InvoiceFormComponent implements OnInit {
  config = new Config();

  formMain: FormGroup;
  submitted: boolean = false;
  Inserting: boolean = false;
  statusSelected: number = 0;
  accountsToSelect: AccountSelectDto[];
  companiesToSelect: CompanySelectDto[];
  invoice: Invoice;
  invoiceId: number;

  model: NgbDateStruct;
  today = this.calendar.getToday();

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: InvoiceService,
    private serviceCompany: CompanyService,
    private serviceAccount: AccountService,
    private modal: AlertModalService,
    private fb: FormBuilder,
    private calendar: NgbCalendar) { }

  ngOnInit() {
    this.invoiceId = this.activeRoute.snapshot.params['id'];

    this.formMain = this.fb.group({
      id: [null],
      invoice_number: [null],
      date_emission: [null, Validators.required],
      provider_id: [null, Validators.required],
      taker_id: [null, Validators.required],
      discrimination: [null, Validators.required],
      value_pis: 0,
      value_cofins: 0,
      value_inss: 0,
      value_ir: 0,
      value_csll: 0,
      other_reviews: 0,
      value_services: 0,
      value_deductions: 0,
      unconditioned_discount: 0,
      calculation_base: 0,
      aliquot: 0,
      value_iss: 0,
      value_iss_withheld: 0,
      conditioned_discount: 0,
      value_liquid: 0,
      value_total: 0
    });

    this.serviceCompany.getCompanyListToLookup().subscribe((result: CompanyListToLookup) => {
      this.companiesToSelect = result.data;
    });

    this.serviceAccount.getAccountListToLookup().subscribe((result: AccountListToLookup) => {
      this.accountsToSelect = result.data;
    });

    this.Inserting = true;
    if (this.invoiceId > 0) {
      this.Inserting = false;
      this.service.getInvoiceById(this.invoiceId).subscribe((result: InvoiceResult) => {
        this.formMain.patchValue({
          id: result.data.id,
          invoice_number: result.data.invoice_number,
          date_emission: result.data.date_emission,
          provider_id: result.data.provider_id,
          taker_id: result.data.taker_id,
          discrimination: result.data.discrimination,
          value_pis: result.data.value_pis,
          value_cofins: result.data.value_cofins,
          value_inss: result.data.value_inss,
          value_ir: result.data.value_ir,
          value_csll: result.data.value_csll,
          other_reviews: result.data.other_reviews,
          value_services: result.data.value_services,
          value_deductions: result.data.value_deductions,
          unconditioned_discount: result.data.unconditioned_discount,
          calculation_base: result.data.calculation_base,
          aliquot: result.data.aliquot,
          value_iss: result.data.value_iss,
          value_iss_withheld: result.data.value_iss_withheld,
          conditioned_discount: result.data.conditioned_discount,
          value_liquid: result.data.value_liquid,
          value_total: result.data.value_total
        });
      });
    }
  }

  onNew() {
    this.formMain.patchValue({
      id: '',
      invoice_number: '',
      date_emission: '',
      provider_id: '',
      taker_id: '',
      discrimination: '',
      value_pis: 0,
      value_cofins: 0,
      value_inss: 0,
      value_ir: 0,
      value_csll: 0,
      other_reviews: 0,
      value_services: 0,
      value_deductions: 0,
      unconditioned_discount: 0,
      calculation_base: 0,
      aliquot: 0,
      value_iss: 0,
      value_iss_withheld: 0,
      conditioned_discount: 0,
      value_liquid: 0,
      value_total: 0
    });
    this.Inserting = true;
  }

  onClose() {
    this.router.navigate(["invoices"]);
  }

  onSubmit() {
    this.submitted = true;
    if (this.formMain.invalid) return;
    this.invoice = new Invoice();
    this.invoice.id = this.formMain.get("id").value;
    this.invoice.invoice_number = this.formMain.get("invoice_number").value;
    this.invoice.date_emission = this.formMain.get("date_emission").value;
    this.invoice.provider_id = this.formMain.get("provider_id").value;
    this.invoice.taker_id = this.formMain.get("taker_id").value;
    this.invoice.discrimination = this.formMain.get("discrimination").value;
    this.invoice.value_pis = this.formMain.get("value_pis").value;
    this.invoice.value_cofins = this.formMain.get("value_cofins").value;
    this.invoice.value_inss = this.formMain.get("value_inss").value;
    this.invoice.value_ir = this.formMain.get("value_ir").value;
    this.invoice.value_csll = this.formMain.get("value_csll").value;
    this.invoice.other_reviews = this.formMain.get("other_reviews").value;
    this.invoice.value_services = this.formMain.get("value_services").value;
    this.invoice.value_deductions = this.formMain.get("value_deductions").value;
    this.invoice.unconditioned_discount = this.formMain.get("unconditioned_discount").value;
    this.invoice.calculation_base = this.formMain.get("calculation_base").value;
    this.invoice.aliquot = this.formMain.get("aliquot").value;
    this.invoice.value_iss = this.formMain.get("value_iss").value;
    this.invoice.value_iss_withheld = this.formMain.get("value_iss_withheld").value;
    this.invoice.conditioned_discount = this.formMain.get("conditioned_discount").value;
    this.invoice.value_liquid = this.formMain.get("value_liquid").value;
    this.invoice.value_total = this.formMain.get("value_total").value;
    if (this.Inserting) {
      this.invoice.created_by = 1;
      this.service.postInvoice(this.invoice).subscribe(
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
      );
    } else {
      this.invoice.updated_by = 1;

      this.service.putInvoice(this.invoice).subscribe(
        (resultServer: any) => {
          if (resultServer.success === true) {
            this.Inserting = false;
            this.modal.showAlertSuccess(resultServer.message);
          } else {
            this.Inserting = true;
            this.modal.showAlertDanger(resultServer.message);
          }
        },
        error => console.error(error)
      );
    }
  }
}
