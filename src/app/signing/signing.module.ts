import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigningRoutingModule } from './signing-routing.module';
import { SigningComponent } from './signing.component';
import { SignupStep1Component } from './signup-step1/signup-step1.component';
import { SignupStep2Component } from './signup-step2/signup-step2.component';
import { SignupStep3Component } from './signup-step3/signup-step3.component';
import { SigninComponent } from './signin/signin.component';


@NgModule({
  declarations: [
    SigningComponent,
    SignupStep1Component,
    SignupStep2Component,
    SignupStep3Component,
    SigninComponent
  ],
  imports: [
    CommonModule,
    SigningRoutingModule
  ]
})
export class SigningModule { }
