import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupStep1Component } from './signup-step1/signup-step1.component';
import { SignupStep2Component } from './signup-step2/signup-step2.component';
import { SignupStep3Component } from './signup-step3/signup-step3.component';
import { SigninComponent } from './signin/signin.component';
import { SigningComponent } from './signing.component';
import { SigninAdminComponent } from './signin-admin/signin-admin.component';

const routes: Routes = [
  {
    path: '',
    component: SigningComponent,
    children: [
      {path: 'creation1', component: SignupStep1Component},
      {path: 'creation2', component: SignupStep2Component},
      {path: 'creation3', component: SignupStep3Component},
      {path: 'connexion', component: SigninComponent},
      {path: 'connexion-admin', component: SigninAdminComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigningRoutingModule { }
