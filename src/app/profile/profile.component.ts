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
  id?: string | null;
  constructor(private userService: UserService, public app: AppComponent, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id)
    if(!this.id)
      this.user = this.app.user!;
    else
      this.loadProfile();
  }

  loadProfile() {
      console.error('visiting profile ...');
      this.userService.readUserById(Number(this.id)).subscribe(
        (data) => {
          console.log(data);
          this.user = data;
        }
        ,(error) => {
          console.log(error);
        }
      )
    }
}
