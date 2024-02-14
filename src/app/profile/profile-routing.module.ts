import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';
import { MyServicesComponent } from './my-services/my-services.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {path: 'compte', component: MyAccountComponent},
      {path: 'mes-projets', component: MyProjectsComponent},
      {path: 'mes-services', component: MyServicesComponent},
      {path: 'notifications', component: NotificationsComponent},
      {path: 'paramètres', component: SettingsComponent},
      {path: 'mes-projets/:status', component: MyProjectsComponent},
      {path: '', redirectTo: 'compte', pathMatch: 'full'}
    ]
  },
  {
    path: ':id',
    component: ProfileComponent,
    children: [
      {path: 'compte', component: MyAccountComponent},
      {path: 'projets', component: MyProjectsComponent},
      {path: 'projets/:status', component: MyProjectsComponent},
      {path: 'services', component: MyServicesComponent},
      {path: '', redirectTo: 'compte', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
