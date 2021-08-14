import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertModalService } from "src/app/_components/alert-modal.service";
import { Service, ServiceResult } from "src/app/_models/service.models";
import { ServiceService } from "src/app/_services/service.service";
import { Config } from "src/app/_utils/config";

@Component({
  selector: "app-service-form",
  templateUrl: "service-form.component.html"
})
export class ServiceFormComponent implements OnInit {
  config = new Config();

  formMain: FormGroup;
  submitted: boolean = false;
  Inserting: boolean = false;
  service: Service;
  serviceId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private modal: AlertModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.serviceId = this.activeRoute.snapshot.params['id'];

    this.formMain = this.fb.group({
      id: [null],
      name: [null, Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required])],
      description: [null],
    });

    this.Inserting = true;
    if (this.serviceId > 0) {
      this.Inserting = false;
      this.serviceService.getServiceById(this.serviceId).subscribe((result: ServiceResult) => {
        this.formMain.patchValue({
          id: result.data.id,
          name: result.data.name,
          description: result.data.description,
        });
      });
    }
  }

  onNew() {
    this.formMain.patchValue({
      id: '',
      name: '',
      description: '',
    });
    this.Inserting = true;
  }

  onClose() {
    this.router.navigate(["services"]);
  }

  onSubmit() {
    this.submitted = true;

    if (this.formMain.invalid) {
      return;
    }
    this.service = new Service();
    this.service.id = this.formMain.get("id").value;
    this.service.name = this.formMain.get("name").value;
    this.service.description = this.formMain.get("description").value;
    if (this.Inserting) {
      this.service.created_by = 1;
      this.serviceService.postService(this.service).subscribe(
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
      this.service.updated_by = 1;
      this.serviceService.putService(this.service).subscribe(
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
