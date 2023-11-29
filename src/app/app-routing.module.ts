import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LayoutComponent } from './Shared/layout/layout.component';
import { AuthGuard } from '../Helper/AuthGuard';

const routes: Routes = [
  { path: "", redirectTo: "/Login", pathMatch: "full" },

  { path: "Login", loadChildren: () => import('./Login/login.component').then(o => o.LoginModule) },
  { path: "ForgotPassword", loadChildren: () => import('./ForgotPassword/forgot-password.component').then(o => o.ForgotPasswordModule) },
  { path: "ResetPassword/:id", loadChildren: () => import('./ResetPassword/reset-password.component').then(o => o.ResetPasswordModule) },
  { canActivate: [AuthGuard], path: "ChangePassword/:id", loadChildren: () => import('./ChangePassword/change-password.component').then(o => o.ChangePasswordModule) },
  { canActivate: [AuthGuard], path: "Dashboard", component: LayoutComponent, loadChildren: () => import('./Dashboard/dashboard.compponent').then(o => o.DashboardModule) },
  { canActivate: [AuthGuard], path: "UserRoleList", component: LayoutComponent, loadChildren: () => import('./UserRole/user_role-list/user_role-list.component').then(o => o.UserListModule) },
  { canActivate: [AuthGuard], path: "StateList", component: LayoutComponent, loadChildren: () => import('./State/state-list.component').then(o => o.StateListModule) },
  { canActivate: [AuthGuard], path: "PropertyList", component: LayoutComponent, loadChildren: () => import('./Property/property-list.component').then(o => o.PropertyListModule) },
  { canActivate: [AuthGuard], path: "UserList", component: LayoutComponent, loadChildren: () => import('./User/user-list/user-list.component').then(o => o.UserListModule) },
  { canActivate: [AuthGuard], path: "User/:id", component: LayoutComponent, loadChildren: () => import('./User/user/user.component').then(o => o.UserModule) },
  { canActivate: [AuthGuard], path: "EnquiryList", component: LayoutComponent, loadChildren: () => import('./Enquiry/enquiry-list/enquiry-list.component').then(o => o.EnquiryListModule) },
  { canActivate: [AuthGuard], path: "Enquiry/:id", component: LayoutComponent, loadChildren: () => import('./Enquiry/enquiry/enquiry.component').then(o => o.EnquiryModule) },
  { canActivate: [AuthGuard], path: "RegistrationList", component: LayoutComponent, loadChildren: () => import('./Registration/registration-list/registration-list.component').then(o => o.RegistrationListModule) },
  { canActivate: [AuthGuard], path: "Registration/:id", component: LayoutComponent, loadChildren: () => import('./Registration/registration/registration.component').then(o => o.RegistrationModule) },
  { canActivate: [AuthGuard], path: "StaffList", component: LayoutComponent, loadChildren: () => import('./Staff/staff-list/staff-list.component').then(o => o.StaffListModule) },
  { canActivate: [AuthGuard], path: "Staff/:id", component: LayoutComponent, loadChildren: () => import('./Staff/staff/staff.component').then(o => o.StaffModule) },
  { canActivate: [AuthGuard], path: "CustomerList", component: LayoutComponent, loadChildren: () => import('./Customer/customer-list/customer-list.component').then(o => o.CustomerListModule) },
  { canActivate: [AuthGuard], path: "Customer/:id", component: LayoutComponent, loadChildren: () => import('./Customer/customer/customer.component').then(o => o.CustomerModule) },
  { canActivate: [AuthGuard], path: "ProductList", component: LayoutComponent, loadChildren: () => import('./Product/product-list/product-list.component').then(o => o.ProductListModule) },
  { canActivate: [AuthGuard], path: "Product/:id", component: LayoutComponent, loadChildren: () => import('./Product/product/product.component').then(o => o.ProductModule) },
  { canActivate: [AuthGuard], path: "PorpertyDocumentList", component: LayoutComponent, loadChildren: () => import('./PropertyDocument/property_document-list/property_document-list.component').then(o => o.PorpertyDocumentListModule) },
  { canActivate: [AuthGuard], path: "PorpertyDocument/:id", component: LayoutComponent, loadChildren: () => import('./PropertyDocument/property_document/property_document.component').then(o => o.PorpertyDocumentModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
