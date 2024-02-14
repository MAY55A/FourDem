import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { OptionsService } from 'src/app/_services/options.service';
import { ProjectService } from 'src/app/_services/project.service';
import { ProfileComponent } from '../profile.component';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  constructor( private profile: ProfileComponent, public app: AppComponent, private projectService: ProjectService, private route: ActivatedRoute, public options: OptionsService) { }
  user = this.profile.user;
  status!: string | null;
  allProjects!: Project[];
  projects: Project[] = [];
  searchValue = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.status = params.get("status");
        this.getProjectsByStatus();
      }
    )
  }

  getProjectsByStatus() {
    this.projectService.getProjectsByUser(this.user!.id!).subscribe(
      (projects) => {
        this.allProjects = projects.filter(p => p.status == this.status);
        this.projects = [...this.allProjects];
      }
    )
  }

  search() {
    this.projects = this.allProjects?.filter(p => p.title.includes(this.searchValue) || p.categories.includes(this.searchValue));
  }
}
