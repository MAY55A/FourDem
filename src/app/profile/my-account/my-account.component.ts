import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/_models/user';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css', '../profile.component.css']
})
export class MyAccountComponent implements OnInit{
  constructor(private profileService: ProfileService, public app: AppComponent, private userService: UserService) {}
  user!: User;
  socials = ['facebook', 'twitter', 'instagram', 'linkedin', 'snapchat', 'github', 'gitlab','youtube','tiktok','pinterest','gmail']
  skills?: string[];
  stats = [0, 0, 0];
  newSkill?: string;

  ngOnInit(): void {
    this.profileService.user$.subscribe((user) => {
      this.user = user!;
      this.getStats();
      this.skills = this.user?.skills ? this.user.skills.split(' ') : [];
    },
    (err) => {
      console.log(err);
    }
    );
  }

  getSocial(c: string) {
    const foundSocial = this.socials.find(s => c.toLowerCase().includes(s));
    if (foundSocial)
      return foundSocial;
    return 'default';
  }

  getStats() {
    if(this.user.type == "Fournisseur") {
      this.stats[0] = this.user.services?.length!;
      this.stats[1] = this.user.services?.filter(s => s.liked).length!;
      this.stats[2] = this.user.services?.filter(s => s.liked === false).length!;
    } else {
      this.stats[0] = this.user.projects?.filter(p => p.status == "publié" || p.status == "terminé").length!;
    }
  }

  addSkill() {
    if(this.newSkill) {
      this.newSkill = this.newSkill.replace(/ /g, '-');
      console.log(this.newSkill);
      if( !this.skills?.includes(this.newSkill)) {
        this.user!.skills = this.user!.skills? `${this.user!.skills} ${this.newSkill}` : this.newSkill;
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