import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServiceService } from '../_services/service.service';
import { Service } from '../_models/service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{

  constructor(private route: ActivatedRoute, private service: ServiceService, private router: Router) {}

  domain!: string | null;
  allServices!: Service[];
  services!: Service[];
  searchValue = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap)=> {
        this.domain = params.get('domaine');
        if(!this.domain)
          this.getAllServices();
        else
          this.getServicesByDomain(this.domain);
        });
  }

  getAllServices() {
    this.service.getAllServices().subscribe(
      (services) => {
        this.allServices = services;
        this.services = services;
      }
    );
  }
  getServicesByDomain(d: string) {
    this.service.getServicesByDomain(d).subscribe(
      (services) => {
        this.allServices = services;
        this.services = services;
      }
    );
  }
  changeDomain() {
    this.router.navigate(['../services/',this.domain])
  }

  search() {
    this.services = this.allServices?.filter(s => s.proposerName.toLowerCase().includes(this.searchValue) || s.description.toLowerCase().includes(this.searchValue) || s.skills.toLowerCase().includes(this.searchValue));
  }
  
  replace(s: string): string {
    return s.replace(/-/g, ' ');
  }
}
