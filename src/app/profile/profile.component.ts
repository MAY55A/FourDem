import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { ProfileService } from '../_services/profile.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  loggedUserId!: number | null;
  user?: User;
  id?: number | null;
  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute, private profileService: ProfileService) {}

  ngOnInit() {
    this.loggedUserId = this.authService.getUserIdFromToken();
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    if(!this.id) {
      this.id = this.loggedUserId;
    }
    this.loadProfile();
  }

  loadProfile() {
      this.userService.readUserById(this.id!).subscribe(
        (data) => {
          this.user = data;
          this.profileService.setUser(data);
        }
        ,(error) => {
          console.log(error);
        }
      )
    }
}