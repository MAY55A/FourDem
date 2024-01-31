import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {path: 'compte', component: MyAccountComponent},
      {path: 'mes-projets', component: MyProjectsComponent},
      {path: 'notifications', component: NotificationsComponent},
      {path: 'mes-projets/:id', component: ProjectComponent},
      {path: '', redirectTo: 'compte', pathMatch: 'full'}
    ]
  },
  {
    path: ':email',
    component: ProfileComponent,
    children: [
      {path: 'compte', component: MyAccountComponent},
      {path: 'projets', component: MyProjectsComponent},
      {path: 'projets/:id', component: ProjectComponent},
      {path: ':email', redirectTo: 'compte', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
