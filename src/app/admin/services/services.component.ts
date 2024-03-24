import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/_models/service';
import { ServiceService } from 'src/app/_services/service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css', '../admin.component.css']
})
export class ServicesComponent  implements OnInit{

  allServices!: Service[];
  services!: Service[];
  status?: string;
  searchValue = '';
  icon = "fa fa-search";

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.service.getAllServices().subscribe(
      (data) => {
        this.allServices = data;
        this.filterStatus();
      }
    )
  }

  filterStatus() {
    if(this.status)
      this.services = this.allServices.filter(s => s.status == this.status)
    else
      this.services = this.allServices;
  }
  search() {
    if(this.searchValue)
      if(this.icon == "fa fa-search") {
        this.services = this.allServices.filter(s => s.id!.toString().includes(this.searchValue) || s.proposer.id!.toString().includes(this.searchValue) || s.proposer.name.toLowerCase().includes(this.searchValue) || s.skills.toLowerCase().includes(this.searchValue));
        this.icon = "fa fa-arrow-left";
      } else {
        this.searchValue = '';
        this.services = this.allServices;
        this.icon = "fa fa-search";
    }
  }
  updateServiceStatus(s: Service, type: string) {
    if(type == "Canceling")
      s.status = 'proposé';
    else
      s.status = 'refusé'
    this.service.updateServiceAndNotify(s,type).subscribe(
      () => {
        console.log('Service status updated successfully');
        this.loadServices();
      }
    )
  }

  deleteService(s: Service) {
    if (confirm("Supprimer le service n°" + s.id + " ?")) {
      this.service.deleteServiceAndNotify(s).subscribe(
        () => {
          console.log('Service deleted successfully');
          this.loadServices();
        },
        (err) => console.log(err)
      );
    }
  }
}
