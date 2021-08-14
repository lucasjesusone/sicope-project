import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './_layouts/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AccountFormComponent } from './pages/account/form/account-form.component';
import { AccountListComponent } from './pages/account/list/account-list.component';
import { AccountPlanListComponent } from './pages/accounts-plan/list/account-plan-list.component';
import { AccountPlanFormComponent } from './pages/accounts-plan/form/account-plan-form.component';
import { JobFunctionListComponent } from './pages/job-function/list/job-function-list.component';
import { JobFunctionFormComponent } from './pages/job-function/form/job-function-form.component';
import { UserListComponent } from './pages/user/list/user-list.component';
import { UserFormComponent } from './pages/user/form/user-form.component';
import { UserGroupListComponent } from './pages/user-group/list/user-group-list.component';
import { UserGroupFormComponent } from './pages/user-group/form/user-group-form.component';
import { CompanyListComponent } from './pages/company/list/company-list.component';
import { CompanyFormComponent } from './pages/company/form/company-form.component';
import { InvoiceFormComponent } from './pages/invoice/form/invoice-form.component';
import { InvoiceListComponent } from './pages/invoice/list/invoice-list.component';
import { CollaboratorListComponent } from './pages/collaborator/list/collaborator-list.component';
import { CollaboratorFormComponent } from './pages/collaborator/form/collaborator-form.component';
import { PaymentMethodFormComponent } from './pages/payment-method/form/payment-method-form.component';
import { PaymentMethodListComponent } from './pages/payment-method/list/payment-method-list.component';
import { ManagementFormComponent } from './pages/management/form/management-form.component';
import { ManagementListComponent } from './pages/management/list/management-list.component';
import { EducationLevelFormComponent } from './pages/education-level/form/education-level-form.component';
import { EducationLevelListComponent } from './pages/education-level/list/education-level-list.component';
import { SectorListComponent } from './pages/sector/list/sector-list.component';
import { SectorFormComponent } from './pages/sector/form/sector-form.component';
import { ServiceListComponent } from './pages/service/list/service-list.component';
import { ServiceFormComponent } from './pages/service/form/service-form.component';
import { DocumentTypeFormComponent } from './pages/document-type/form/document-type-form.component';
import { DocumentTypeListComponent } from './pages/document-type/list/document-type-list.component';
import { ManagerialNatureFormComponent } from './pages/managerial-nature/form/managerial-nature-form.component';
import { ManagerialNatureListComponent } from './pages/managerial-nature/list/managerial-nature-list.component';
import { AuthGuard } from './_helpers';
import { UnreleasedComponent } from './pages/unreleased/unreleased.component';
import { ExpenseListComponent } from './pages/expenses/list/expenses-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    canActivate: [AuthGuard],
    "path": "",
    "component": LayoutComponent,
    "children": [
      { path: "index", component: HomeComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "accounts",
    component: LayoutComponent,
    children: [
      { path: "", component: AccountListComponent },
      { path: "form", component: AccountFormComponent },
      { path: "form/:id", component: AccountFormComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "account-plans",
    component: LayoutComponent,
    children: [
      { path: "", component: AccountPlanListComponent },
      { path: "form", component: AccountPlanFormComponent },
      { path: "form/:id", component: AccountPlanFormComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "companies",
    component: LayoutComponent,
    children: [
      { path: "", component: CompanyListComponent },
      { path: "form", component: CompanyFormComponent },
      { path: "form/:id", component: CompanyFormComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "collaborators",
    component: LayoutComponent,
    children: [
      { path: "", component: CollaboratorListComponent },
      { path: "form", component: CollaboratorFormComponent },
      { path: "form/:id", component: CollaboratorFormComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "document-types",
    component: LayoutComponent,
    children: [
      { path: "", component: DocumentTypeListComponent },
      { path: "form", component: DocumentTypeFormComponent },
      { path: "form/:id", component: DocumentTypeFormComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "education-levels",
    component: LayoutComponent,
    children: [
      { path: "", component: EducationLevelListComponent },
      { path: "form", component: EducationLevelFormComponent },
      { path: "form/:id", component: EducationLevelFormComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "invoices",
    component: LayoutComponent,
    children: [
      { path: "", component: InvoiceListComponent },
      { path: "form", component: InvoiceFormComponent },
      { path: "form/:id", component: InvoiceFormComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "managements",
    component: LayoutComponent,
    children: [
      { path: "", component: ManagementListComponent },
      { path: "form", component: ManagementFormComponent },
      { path: "form/:id", component: ManagementFormComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "managerial-natures",
    component: LayoutComponent,
    children: [
      { path: "", component: ManagerialNatureListComponent },
      { path: "form", component: ManagerialNatureFormComponent },
      { path: "form/:id", component: ManagerialNatureFormComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "job-functions",
    component: LayoutComponent,
    children: [
      { path: "", component: JobFunctionListComponent },
      { path: "form", component: JobFunctionFormComponent },
      { path: "form/:id", component: JobFunctionFormComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "sectors",
    component: LayoutComponent,
    children: [
      { path: "", component: SectorListComponent },
      { path: "form", component: SectorFormComponent },
      { path: "form/:id", component: SectorFormComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "services",
    component: LayoutComponent,
    children: [
      { path: "", component: ServiceListComponent },
      { path: "form", component: ServiceFormComponent },
      { path: "form/:id", component: ServiceFormComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "payment-methods",
    component: LayoutComponent,
    children: [
      { path: "", component: PaymentMethodListComponent },
      { path: "form", component: PaymentMethodFormComponent },
      { path: "form/:id", component: PaymentMethodFormComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "expenses",
    component: LayoutComponent,
    children: [
      { path: "", component: ExpenseListComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "flow",
    component: LayoutComponent,
    children: [
      { path: "", component: UnreleasedComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "payroll",
    component: LayoutComponent,
    children: [
      { path: "", component: UnreleasedComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "measurement",
    component: LayoutComponent,
    children: [
      { path: "", component: UnreleasedComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "revenues",
    component: LayoutComponent,
    children: [
      { path: "", component: UnreleasedComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "users",
    component: LayoutComponent,
    children: [
      { path: "", component: UserListComponent },
      { path: "form", component: UserFormComponent },
      { path: "form/:id", component: UserFormComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: "user-groups",
    component: LayoutComponent,
    children: [
      { path: "", component: UserGroupListComponent },
      { path: "form", component: UserGroupFormComponent },
      { path: "form/:id", component: UserGroupFormComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  {
    "path": "**",
    "redirectTo": "error_404",
    "pathMatch": "full"
  },
];

export const RoutingModule = RouterModule.forRoot(routes)
