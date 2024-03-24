import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ComptesComponent } from './comptes/comptes.component';
import { ProjetsComponent } from './projets/projets.component';
import { ServicesComponent } from './services/services.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { DonutChartComponent } from './home/donut-chart/donut-chart.component';


@NgModule({
  declarations: [
    ComptesComponent,
    ProjetsComponent,
    ServicesComponent,
    CategoriesComponent,
    HomeComponent,
    DonutChartComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
