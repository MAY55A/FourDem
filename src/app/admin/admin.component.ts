import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css', '../profile/profile.component.css']
})
export class AdminComponent {
  constructor(public router: Router) {}
}
