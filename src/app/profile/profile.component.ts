import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user!: User;

  constructor(private userService: UserService, private app: AppComponent, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    if(this.app.user)
      this.user = this.app.user;
    else {
      var email = this.route.snapshot.paramMap.get("email")
      console.error('visiting profile ...', email);
      if(email)
        this.userService.readUser(email).subscribe(
          (data) => {
            this.user = data;
          }
      )
    }
  }

}
