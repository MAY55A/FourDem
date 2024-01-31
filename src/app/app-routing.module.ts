import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {path:'', redirectTo: 'accueil', pathMatch: 'full'},
  {path: 'accueil', component: HomeComponent},
  {path: 'projets', component: ProjectsComponent},
  {path: 'projets/:domaine', component: ProjectsComponent},
  {path: 'projets/:domaine/:categorie', component: ProjectsComponent},
  {path: 'services',component: ServicesComponent},
  {path: 'services/:domaine', component: ServicesComponent},
  {path: 'services/:domaine/:categorie', component: ServicesComponent},
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
