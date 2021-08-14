import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from 'src/app/_components/alert-modal.service';
import { CompanySelectDto } from 'src/app/_dtos/company-select.dto';
import { EducationLevelSelectDto } from 'src/app/_dtos/education-level-select.dto';
import { JobFunctionSelectDto } from 'src/app/_dtos/job-function-select.dto';
import { SectorSelectDto } from 'src/app/_dtos/sector-select.dto';
import { CepResult } from 'src/app/_models/cep.model';
import { Collaborator, CollaboratorResult, } from 'src/app/_models/collaborator.models';
import { CompanyListToLookup } from 'src/app/_models/company.models';
import { EducationLevelListToLookup } from 'src/app/_models/education-level.models';
import { JobFunctionListToLookup } from 'src/app/_models/job-function.models';
import { SectorListToLookup } from 'src/app/_models/sector.models';
import { CollaboratorService } from 'src/app/_services/collaborator.service';
import { CompanyService } from 'src/app/_services/company.service';
import { EducationLevelService } from 'src/app/_services/education-level.service';
import { JobFunctionService } from 'src/app/_services/job-function.service';
import { SectorService } from 'src/app/_services/sector.service';
import { SharedService } from 'src/app/_services/shared.service';
import { Config } from 'src/app/_utils/config';

@Component({
  selector: 'app-collaborator-form',
  templateUrl: 'collaborator-form.component.html',
})
export class CollaboratorFormComponent implements OnInit {
  config = new Config();

  formMain: FormGroup;
  submitted: boolean = false;
  Inserting: boolean = false;
  statusSelected: number = 0;
  collaborator: Collaborator;
  educationLevelToSelect: EducationLevelSelectDto[];
  companiesToSelect: CompanySelectDto[];
  jobFunctionToSelect: JobFunctionSelectDto[];
  sectorsToSelect: SectorSelectDto[];
  zipCode: number;
  collaboratorId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: CollaboratorService,
    private serviceCompany: CompanyService,
    private serviceSector: SectorService,
    private serviceJobFunction: JobFunctionService,
    private serviceEducationLevel: EducationLevelService,
    private serviceShared: SharedService,
    private modal: AlertModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.collaboratorId = this.activeRoute.snapshot.params['id'];

    this.serviceEducationLevel.getEducationLevelListToLookup().subscribe((result: EducationLevelListToLookup) => {
      this.educationLevelToSelect = result.data;
    });

    this.serviceSector.getSectorListToLookup().subscribe((result: SectorListToLookup) => {
      this.sectorsToSelect = result.data;
    });

    this.serviceCompany.getCompanyListToLookup().subscribe((result: CompanyListToLookup) => {
      this.companiesToSelect = result.data;
    });

    this.serviceJobFunction.getJobFunctionListToLookup().subscribe((result: JobFunctionListToLookup) => {
      this.jobFunctionToSelect = result.data;
    });

    this.formMain = this.fb.group({
      id: [null],
      name: [
        null,
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.required,
        ]),
      ],
      education_level_id: [null],
      sector_id: [null],
      job_function_id: [null],
      company_id: [null],
      is_active: [null],
      sex: [null],
      marital_status: [null],
      name_mother: [null],
      name_father: [null],
      name_husband_wife: [null],
      name_children: [null],
      date_birth: [null],
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
      telephone_corporate: [null],
      cnh: [null],
      cnh_category: [null],
      identity: [null],
      identity_date_emission: [null],
      cpf: [null],
      pis: [null],
      ctps: [null],
      voter_card: [null],
      voter_zone: [null],
      voter_session: [null],
      date_admission: [null],
      date_in: [null],
      date_demission: [null],
    });

    this.Inserting = true;
    if (this.collaboratorId > 0) {
      this.Inserting = false;
      this.service.getCollaboratorById(this.collaboratorId)
        .subscribe((result: CollaboratorResult) => {
          this.formMain.patchValue({
            id: result.data.id,
            education_level_id: result.data.education_level_id,
            sector_id: result.data.sector_id,
            job_function_id: result.data.job_function_id,
            company_id: result.data.company_id,
            name: result.data.name,
            is_active: result.data.is_active,
            sex: result.data.sex,
            marital_status: result.data.marital_status,
            name_mother: result.data.name_mother,
            name_father: result.data.name_father,
            name_husband_wife: result.data.name_husband_wife,
            name_children: result.data.name_children,
            date_birth: result.data.date_birth,
            zip_code: result.data.zip_code,
            street: result.data.street,
            number: result.data.number,
            complement: result.data.complement,
            neighborhood: result.data.neighborhood,
            city: result.data.city,
            city_code: result.data.city_code,
            state: result.data.state,
            telephone: result.data.telephone,
            telephone_corporate: result.data.telephone_corporate,
            cell: result.data.cell,
            whatsapp: result.data.whatsapp,
            email: result.data.email,
            cnh: result.data.cnh,
            cnh_category: result.data.cnh_category,
            identity: result.data.identity,
            identity_date_emission: result.data.identity_date_emission,
            cpf: result.data.cpf,
            pis: result.data.pis,
            ctps: result.data.ctps,
            voter_card: result.data.voter_card,
            voter_zone: result.data.voter_zone,
            voter_session: result.data.voter_session,
            date_admission: result.data.date_admission,
            date_in: result.data.date_in,
            date_demission: result.data.date_demission,
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

  onNew() {
    this.formMain.patchValue({
      id: [null],
      name: [null],
      education_level_id: [null],
      sector_id: [null],
      job_function_id: [null],
      company_id: [null],
      is_active: [null],
      sex: [null],
      marital_status: [null],
      name_mother: [null],
      name_father: [null],
      name_husband_wife: [null],
      name_children: [null],
      date_birth: [null],
      zip_code: [null],
      street: [null],
      number: [null],
      complement: [null],
      neighborhood: [null],
      city: [null],
      city_code: [null],
      state: [null],
      telephone: [null],
      telephone_corporate: [null],
      cell: [null],
      whatsapp: [null],
      email: [null],
      cnh: [null],
      cnh_category: [null],
      identity: [null],
      identity_date_emission: [null],
      cpf: [null],
      pis: [null],
      ctps: [null],
      voter_card: [null],
      voter_zone: [null],
      voter_session: [null],
      date_admission: [null],
      date_in: [null],
      date_demission: [null],
    });
    this.Inserting = true;
  }

  onClose() {
    this.router.navigate(['collaborators']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.formMain.invalid) {
      return;
    }
    this.collaborator = new Collaborator();
    this.collaborator.id = this.formMain.get('id').value;
    this.collaborator.name = this.formMain.get('name').value;
    this.collaborator.education_level_id = this.formMain.get('education_level_id').value;
    this.collaborator.sector_id = this.formMain.get('sector_id').value;
    this.collaborator.job_function_id = this.formMain.get('job_function_id').value;
    this.collaborator.company_id = this.formMain.get('company_id').value;
    this.collaborator.is_active = this.formMain.get('is_active').value;
    this.collaborator.sex = this.formMain.get('sex').value;
    this.collaborator.marital_status = this.formMain.get('marital_status').value;
    this.collaborator.name_mother = this.formMain.get('name_mother').value;
    this.collaborator.name_father = this.formMain.get('name_father').value;
    this.collaborator.name_husband_wife = this.formMain.get('name_husband_wife').value;
    this.collaborator.name_children = this.formMain.get('name_children').value;
    this.collaborator.date_birth = this.formMain.get('date_birth').value;
    this.collaborator.zip_code = this.formMain.get("zip_code").value.replace(".", "").replace("-", "")
    this.collaborator.street = this.formMain.get('street').value;
    this.collaborator.number = this.formMain.get('number').value;
    this.collaborator.complement = this.formMain.get('complement').value;
    this.collaborator.neighborhood = this.formMain.get('neighborhood').value;
    this.collaborator.city = this.formMain.get('city').value;
    this.collaborator.city_code = this.formMain.get('city_code').value;
    this.collaborator.state = this.formMain.get('state').value;
    this.collaborator.telephone = this.formMain.get('telephone').value;
    this.collaborator.telephone_corporate = this.formMain.get('telephone_corporate').value;
    this.collaborator.cell = this.formMain.get('cell').value;
    this.collaborator.whatsapp = this.formMain.get('whatsapp').value;
    this.collaborator.email = this.formMain.get('email').value;
    this.collaborator.cnh = this.formMain.get('cnh').value;
    this.collaborator.cnh_category = this.formMain.get('cnh_category').value;
    this.collaborator.identity = this.formMain.get('identity').value;
    this.collaborator.identity_date_emission = this.formMain.get('identity_date_emission').value;
    this.collaborator.cpf = this.formMain.get("cpf").value.replace(".", "").replace("-", "")
    this.collaborator.pis = this.formMain.get('pis').value;
    this.collaborator.ctps = this.formMain.get('ctps').value;
    this.collaborator.voter_card = this.formMain.get('voter_card').value;
    this.collaborator.voter_zone = this.formMain.get('voter_zone').value;
    this.collaborator.voter_session = this.formMain.get('voter_session').value;
    this.collaborator.date_admission = this.formMain.get('date_admission').value;
    this.collaborator.date_in = this.formMain.get('date_in').value;
    this.collaborator.date_demission = this.formMain.get('date_demission').value;

    if (this.Inserting) {
      this.collaborator.created_by = 1;
      this.service.postCollaborator(this.collaborator).subscribe(
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
      this.collaborator.updated_by = 1;
      this.service.putCollaborator(this.collaborator).subscribe(
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
