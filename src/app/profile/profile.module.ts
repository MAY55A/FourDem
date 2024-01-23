import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProjectComponent } from './project/project.component';


@NgModule({
  declarations: [
    ProfileComponent,
    MyProjectsComponent,
    MyAccountComponent,
    NotificationsComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
