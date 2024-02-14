import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/_services/service.service';
import { ProfileComponent } from '../profile.component';
import { Service } from 'src/app/_models/service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit{

  constructor(private service: ServiceService, private profile: ProfileComponent, public app: AppComponent) {}

  user = this.profile.user;
  allServices: any[] = [];
  services: any[]= [];
  searchValue = '';

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.service.getServicesByUser(this.user.id!).subscribe(
      (services) => {
        this.allServices = services;
        this.services = services;
      }
    )
  }

  deleteservice(id: number) {
    this.service.deleteService(id).subscribe(
      () => {
        console.log("deleting service...");
      }
    )
  }

  search() {
    this.services = this.allServices?.filter(s => s.description.includes(this.searchValue) || s.skills.includes(this.searchValue));
  }
}
