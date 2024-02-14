import { Component } from '@angular/core';
import { ProfileComponent } from '../profile.component';
import { UserService } from 'src/app/_services/user.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css', '../profile.component.css']
})
export class MyAccountComponent {
  constructor(private profile: ProfileComponent, public app: AppComponent, private userService: UserService) { }
  user = this.profile.user;
  socials = ['facebook', 'twitter', 'instagram', 'linkedin', 'snapchat', 'github', 'gitlab','youtube','tiktok','pinterest','gmail']
  skills = this.user.skills? this.user.skills.split(' ') : [];
  newSkill?: string;

  getSocial(c: string) {
    const foundSocial = this.socials.find(s => c.toLowerCase().includes(s));
    if (foundSocial)
      return foundSocial;
    return 'default';
  }

  addSkill() {
    if(this.newSkill) {
      this.newSkill = this.newSkill.replace(/ /g, '-');
      console.log(this.newSkill);
      if( !this.skills?.includes(this.newSkill)) {
        this.user!.skills = this.user!.skills? `${this.user.skills} ${this.newSkill}` : this.newSkill;
        this.skills?.push(this.newSkill);
        this.newSkill = '';
        this.userService.updateUser(this.user!).subscribe(
          () => {
            console.log("adding skill...", this.user?.skills);
          }
        )
      }
    }
  }

  removeSkill(i: number) {
    this.skills?.splice(i,1);
    this.user!.skills = this.skills?.join(' ').trim();
    this.userService.updateUser(this.user!).subscribe(
      () => {
        console.log("removing skill...", this.user?.skills);
      }
    )
  }

  replace(s: string): string {
    return s.replace(/-/g, ' ');
  }
}