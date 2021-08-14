import { NewServiceModalComponent } from './_components/new-service-modal/new-service-modal.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './/app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgSelectModule } from '@ng-select/ng-select';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AlertModalComponent } from './_components/alert-modal/alert-modal.component';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { RoutingModule } from './app-routing.module';
import { LayoutComponent } from './_layouts/layout.component';
import { AppHeader } from './_layouts/app-header/app-header.component';
import { AppSidebar } from './_layouts/app-sidebar/app-sidebar.component';
import { AppFooter } from './_layouts/app-footer/app-footer.component';
import { LoadingComponent } from './_components/loading/loading.component';
import { UserListComponent } from './pages/user/list/user-list.component';
import { UserFormComponent } from './pages/user/form/user-form.component';
import { UserGroupListComponent } from './pages/user-group/list/user-group-list.component';
import { UserGroupFormComponent } from './pages/user-group/form/user-group-form.component';
import { JobFunctionListComponent } from './pages/job-function/list/job-function-list.component';
import { JobFunctionFormComponent } from './pages/job-function/form/job-function-form.component';
import { AccountListComponent } from './pages/account/list/account-list.component';
import { AccountFormComponent } from './pages/account/form/account-form.component';
import { CompanyListComponent } from './pages/company/list/company-list.component';
import { CompanyFormComponent } from './pages/company/form/company-form.component';
import { CollaboratorFormComponent } from './pages/collaborator/form/collaborator-form.component';
import { CollaboratorListComponent } from './pages/collaborator/list/collaborator-list.component';
import { PaymentMethodFormComponent } from './pages/payment-method/form/payment-method-form.component';
import { PaymentMethodListComponent } from './pages/payment-method/list/payment-method-list.component';
import { InvoiceListComponent } from './pages/invoice/list/invoice-list.component';
import { InvoiceFormComponent } from './pages/invoice/form/invoice-form.component';
import { ManagementFormComponent } from './pages/management/form/management-form.component';
import { ManagementListComponent } from './pages/management/list/management-list.component';
import { EducationLevelFormComponent } from './pages/education-level/form/education-level-form.component';
import { EducationLevelListComponent } from './pages/education-level/list/education-level-list.component';
import { SectorFormComponent } from './pages/sector/form/sector-form.component';
import { SectorListComponent } from './pages/sector/list/sector-list.component';
import { AccountPlanListComponent } from './pages/accounts-plan/list/account-plan-list.component';
import { AccountPlanFormComponent } from './pages/accounts-plan/form/account-plan-form.component';
import { ServiceListComponent } from './pages/service/list/service-list.component';
import { ServiceFormComponent } from './pages/service/form/service-form.component';
import { DocumentTypeListComponent } from './pages/document-type/list/document-type-list.component';
import { DocumentTypeFormComponent } from './pages/document-type/form/document-type-form.component';
import { ManagerialNatureListComponent } from './pages/managerial-nature/list/managerial-nature-list.component';
import { ManagerialNatureFormComponent } from './pages/managerial-nature/form/managerial-nature-form.component';

registerLocaleData(localePt);

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true
};

@NgModule({
  declarations: [
    AlertModalComponent,
    NewServiceModalComponent,
    AppComponent,
    LayoutComponent,
    AppHeader,
    AppSidebar,
    AppFooter,
    HomeComponent,
    LoginComponent,
    AccountListComponent,
    AccountFormComponent,
    AccountPlanListComponent,
    AccountPlanFormComponent,
    CompanyListComponent,
    CompanyFormComponent,
    CollaboratorListComponent,
    CollaboratorFormComponent,
    DocumentTypeListComponent,
    DocumentTypeFormComponent,
    EducationLevelListComponent,
    EducationLevelFormComponent,
    ManagementListComponent,
    ManagementFormComponent,
    ManagerialNatureListComponent,
    ManagerialNatureFormComponent,
    PaymentMethodListComponent,
    PaymentMethodFormComponent,
    InvoiceListComponent,
    InvoiceFormComponent,
    JobFunctionListComponent,
    JobFunctionFormComponent,
    SectorListComponent,
    SectorFormComponent,
    ServiceListComponent,
    ServiceFormComponent,
    UserListComponent,
    UserFormComponent,
    UserGroupListComponent,
    UserGroupFormComponent,
    LoadingComponent
  ],
  exports: [
    LayoutComponent,
    AppHeader,
    AppSidebar,
    AppFooter,
  ],
  imports: [
    NgSelectModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  entryComponents: [AlertModalComponent, NewServiceModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
