import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-admin',
  templateUrl: './signin-admin.component.html',
  styleUrls: ['../signing.component.css','./signin-admin.component.css']
})
export class SigninAdminComponent {

  constructor(private router: Router) {}

  key = "adminkey";
  password!: string;
  alert = '';

  login() {
    if(this.password !== this.key)
      this.alert = "clé non valide !"
    else
      this.router.navigate(['admin']);
  };

}
