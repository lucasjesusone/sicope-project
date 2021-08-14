import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertModalService } from "src/app/_components/alert-modal.service";
import { Sector, SectorResult } from "src/app/_models/sector.models";
import { SectorService } from "src/app/_services/sector.service";
import { Config } from "src/app/_utils/config";

@Component({
  selector: "app-sector-form",
  templateUrl: "sector-form.component.html"
})
export class SectorFormComponent implements OnInit {
  config = new Config();

  formMain: FormGroup;
  submitted: boolean = false;
  Inserting: boolean = false;
  sector: Sector;
  sectorId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: SectorService,
    private modal: AlertModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.sectorId = this.activeRoute.snapshot.params['id'];

    this.formMain = this.fb.group({
      id: [null],
      description: [null, Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required])],
    });

    this.Inserting = true;
    if (this.sectorId > 0) {
      this.Inserting = false;
      this.service.getSectorById(this.sectorId).subscribe((result: SectorResult) => {
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
    this.router.navigate(["sectors"]);
  }

  onSubmit() {
    this.submitted = true;

    if (this.formMain.invalid) {
      return;
    }
    this.sector = new Sector();
    this.sector.id = this.formMain.get("id").value;
    this.sector.description = this.formMain.get("description").value;
    if (this.Inserting) {
      this.sector.created_by = 1;
      this.service.postSector(this.sector).subscribe(
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
      this.sector.updated_by = 1;
      this.service.putSector(this.sector).subscribe(
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
