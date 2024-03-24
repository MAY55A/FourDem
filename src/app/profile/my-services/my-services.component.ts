import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/_services/service.service';
import { Service } from 'src/app/_models/service';
import { AppComponent } from 'src/app/app.component';
import { ProfileService } from 'src/app/_services/profile.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css', '../../services/services.component.css']
})
export class MyServicesComponent implements OnInit{

  constructor(private service: ServiceService, private profileService: ProfileService, public app: AppComponent) {}

  user!: User;
  allServices: Service[] = [];
  services: Service[]= [];
  searchValue = '';

  ngOnInit(): void {
    this.profileService.user$.subscribe((user) => {
      this.user = user!;
      this.allServices = user!.services!;
      this.services = user!.services!;
    });
  }

  deleteservice(s: Service) {
    if (confirm('Voulez vous vraiment supprimer ce service ?')) {
      this.service.deleteServiceAndNotify(s).subscribe(
        () => {
          console.log("deleting service...");
          window.location.reload();
        }
      )
    }
  }

  search() {
    this.services = this.allServices?.filter(s => s.description.includes(this.searchValue) || s.skills.toLowerCase().includes(this.searchValue));
  }

  replace(s: string): string {
    return s.replace(/-/g, ' ');
  }
}
