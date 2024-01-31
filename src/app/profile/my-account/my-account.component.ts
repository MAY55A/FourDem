import { Component } from '@angular/core';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css','../profile.component.css']
})
export class MyAccountComponent {
  constructor(private profile: ProfileComponent) {}
  user = this.profile.user;
}
