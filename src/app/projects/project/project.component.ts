import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { Service } from 'src/app/_models/service';
import { ProjectService } from 'src/app/_services/project.service';
import { ServiceService } from 'src/app/_services/service.service';
import { UserService } from 'src/app/_services/user.service';
import { AppComponent } from 'src/app/app.component';
import { Location } from '@angular/common';
import { OptionsService } from 'src/app/_services/options.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['../../profile/my-projects/my-projects.component.css','../projects.component.css','./project.component.css'],
})
export class ProjectComponent implements OnInit{
  displayStyle = "none";
  project!: Project;
  service = new Service();
  proposedServices?: Service[];
  user = this.app.user;
  skills?: string[] = [];
  checkedSkills?: boolean[] = [true];
  selectedSkills: Set<string> = new Set();
  newSkill?: string;
  constructor(private projectService: ProjectService, private route: ActivatedRoute, private app: AppComponent, public options: OptionsService, private userService: UserService, private serviceService: ServiceService, private location: Location) {}

  ngOnInit(): void {
    var id = Number(this.route.snapshot.paramMap.get("id"));
    this.getProject(id);
    this.getPropositions(id)
    if(this.user?.skills) {
      this.skills = this.user.skills.split(' ');
      this.checkedSkills = new Array(this.skills?.length).fill(false);
    }
  }

  getProject(id: number) {
    this.projectService.getProject(id).subscribe(
      (p) => {
        this.project = p;
      }
    )
  }

  getPropositions(id: number) {
    this.serviceService.getServicesByProject(id).subscribe(
      (services) => {
        this.proposedServices = services;
      }
    )
  }

  updateSelectedSkills() {
    this.selectedSkills = new Set();
    this.checkedSkills!.forEach((checked, i) => {
      if (checked)
        this.selectedSkills.add(this.skills![i]);
    })
  }

  addSkill() {
    if(this.newSkill) {
        this.newSkill = this.newSkill.replace(/ /g, '-');
        console.log(this.newSkill);
      if( !this.skills?.includes(this.newSkill)) {
        console.log(this.user?.skills)
        this.user!.skills = (this.user!.skills + ' ' + this.newSkill.replace(/ /g, ',')).trim();
        this.skills?.push(this.newSkill);
        this.checkedSkills?.push(true);
        this.selectedSkills?.add(this.newSkill);
        console.log(this.checkedSkills)
        console.log(this.selectedSkills)
        this.newSkill = '';
        this.userService.updateUser(this.user!).subscribe(
          () => {
            console.log("adding skill...", this.user?.skills);
          }
        )
      }
    }
  }

  disable() {
    return !(this.service.description && this.selectedSkills.size>0)
  }

  proposeService() {
    this.service.proposerId = this.user!.id!;
    this.service.proposerName = this.user!.name;
    this.service.project = this.project.id!;
    this.service.skills = [...this.selectedSkills].join(' ');
    this.serviceService.createService(this.service).subscribe(
      () => {
        console.log("proposing service ...");
        this.service = new Service();
        this.getPropositions(this.project.id!);
      }
    )
  }

  replace(s: string): string {
    console.log(s.replace(/-/g, ' '));
    return s.replace(/-/g, ' ');
  }

  goBack() {
    this.location.back();
  }
}
