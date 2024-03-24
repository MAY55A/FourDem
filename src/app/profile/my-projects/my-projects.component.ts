import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { OptionsService } from 'src/app/_services/options.service';
import { ProjectService } from 'src/app/_services/project.service';
import { ProfileComponent } from '../profile.component';
import { AppComponent } from 'src/app/app.component';
import { ProfileService } from 'src/app/_services/profile.service';
import { User } from 'src/app/_models/user';


@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  constructor(private profileService: ProfileService, public app: AppComponent, private projectService: ProjectService, private route: ActivatedRoute, public options: OptionsService) { }
  user!: User;
  status!: string | null;
  allProjects!: Project[];
  projects: Project[] = [];
  searchValue = '';

  ngOnInit(): void {
    this.profileService.user$.subscribe((user) => {
      this.user = user!;
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.status = params.get("status");
          this.getProjectsByStatus();
        }
      )
    },
    (err) => {
      console.log(err);
    }
    );

  }

  getProjectsByStatus() {
    this.allProjects = this.user!.projects!.filter(p => p.status == this.status);
    this.projects = [...this.allProjects];
  }

  search() {
    this.projects = this.allProjects?.filter(p => p.title.toLowerCase().includes(this.searchValue) || p.categories.map(c=>c.name.toLowerCase()).some(c => c.includes(this.searchValue)));
  }
}
