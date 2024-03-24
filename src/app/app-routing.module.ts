import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  {path:'', redirectTo: 'accueil', pathMatch: 'full'},
  {path: 'accueil', component: HomeComponent},
  {path: 'services',component: ServicesComponent},
  {path: 'services/:domaine', component: ServicesComponent},
  {
    path: 'compte',
    loadChildren: ()=>import("./signing/signing.module").then((p)=>p.SigningModule)
  },
  {
    path: 'profile',
    loadChildren: ()=>import("./profile/profile.module").then((p)=>p.ProfileModule)
  },
  {
    path: 'projets',
    loadChildren: ()=>import("./projects/projects.module").then((p)=>p.ProjectsModule)
  },
  {
    path: 'admin',
    loadChildren: ()=>import("./admin/admin.module").then((p)=>p.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
