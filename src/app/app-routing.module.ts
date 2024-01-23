import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'services/:domaine', component: ServicesComponent},
  {path: 'services',component: ServicesComponent},
  {path: 'projets', component: ProjectsComponent},
  {
    path: 'compte',
    loadChildren: ()=>import("./signing/signing.module").then((p)=>p.SigningModule)
  },
  {
    path: 'profile',
    loadChildren: ()=>import("./profile/profile.module").then((p)=>p.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
