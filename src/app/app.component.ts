import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models/user';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FourDev-front';
  user? : User;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile().subscribe(
      (data: User) => {
        this.user = data;
      }
    );
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/compte/connexion']).then(() => {location.reload();});
  }
}
