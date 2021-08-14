import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertModalService } from "src/app/_components/alert-modal.service";
import { PaymentMethod, PaymentMethodResult } from "src/app/_models/payment-method.models";
import { PaymentMethodService } from "src/app/_services/payment-method.service";
import { Config } from "src/app/_utils/config";

@Component({
  selector: "app-payment-method-form",
  templateUrl: "payment-method-form.component.html"
})
export class PaymentMethodFormComponent implements OnInit {
  config = new Config();

  formMain: FormGroup;
  submitted: boolean = false;
  Inserting: boolean = false;
  paymentMethod: PaymentMethod;
  paymentMethodId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: PaymentMethodService,
    private modal: AlertModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.paymentMethodId = this.activeRoute.snapshot.params['id'];

    this.formMain = this.fb.group({
      id: [null],
      description: [null, Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.required])],
    });

    this.Inserting = true;
    if (this.paymentMethodId > 0) {
      this.Inserting = false;
      this.service.getPaymentMethodById(this.paymentMethodId).subscribe((result: PaymentMethodResult) => {
        this.formMain.patchValue({
          id: result.data.id,
          description: result.data.description,
        });
      });
    }
  }

  onNew() {
    this.formMain.patchValue({
      id: '',
      description: '',
    });
    this.Inserting = true;
  }

  onClose() {
    this.router.navigate(["payment-methods"]);
  }

  onSubmit() {
    this.submitted = true;

    if (this.formMain.invalid) {
      return;
    }
    this.paymentMethod = new PaymentMethod();
    this.paymentMethod.id = this.formMain.get("id").value;
    this.paymentMethod.description = this.formMain.get("description").value;
    if (this.Inserting) {
      this.paymentMethod.created_by = 1;
      this.service.postPaymentMethod(this.paymentMethod).subscribe(
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
        error => this.modal.showAlertDanger(error)
      );
    } else {
      this.paymentMethod.updated_by = 1;
      this.service.putPaymentMethod(this.paymentMethod).subscribe(
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
