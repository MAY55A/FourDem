import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../_services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  constructor(private service: ServiceService) {}
  domains: {[key: string]: number} = {
    "IT": 0,
    "Comptabilité" : 0,
    "Influence" : 0
  };
  ngOnInit(): void {
    for(var d in this.domains)
      this.getCount(d);
  }

  getCount(d : string) {
    this.service.getCountByDomain(d).subscribe(
      (n: any) => {
        this.domains[d] = n;
      });
  }
}
