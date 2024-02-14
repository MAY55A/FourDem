import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProjectComponent } from '../projects/project/project.component';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { MyServicesComponent } from './my-services/my-services.component';


@NgModule({
  declarations: [
    ProfileComponent,
    MyProjectsComponent,
    MyAccountComponent,
    NotificationsComponent,
    ProjectComponent,
    SettingsComponent,
    MyServicesComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule
  ]
})
export class ProfileModule { }
