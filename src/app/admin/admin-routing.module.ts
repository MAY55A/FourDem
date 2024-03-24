import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComptesComponent } from './comptes/comptes.component';
import { ProjetsComponent } from './projets/projets.component';
import { ServicesComponent } from './services/services.component';
import { CategoriesComponent } from './categories/categories.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children : [
      {path: 'accueil', component: HomeComponent},
      {path: 'comptes', component: ComptesComponent},
      {path: 'projets', component: ProjetsComponent},
      {path: 'services', component: ServicesComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: '', redirectTo: 'accueil', pathMatch: 'full'}
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
