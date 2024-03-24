import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_models/category';
import { Project } from 'src/app/_models/project';
import { NotificationService } from 'src/app/_services/notification.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css', '../admin.component.css']
})
export class ProjetsComponent implements OnInit{

  allProjects!: Project[];
  projects!: Project[];
  status?: string;
  searchValue = '';
  icon = "fa fa-search";

  constructor(private projectService: ProjectService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadProjects();
    
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(
      (data) => {
        this.allProjects = data;
        this.filterStatus();
      }
    )
  }

  filterStatus() {
    if(this.status)
      this.projects = this.allProjects.filter(p => p.status == this.status)
    else
      this.projects = this.allProjects;
  }

  search() {
    if(this.searchValue)
      if(this.icon == "fa fa-search") {
        this.projects = this.allProjects.filter(p => p.id!.toString().includes(this.searchValue) || p.title.toLowerCase().includes(this.searchValue) || p.proposer.name.toLowerCase().includes(this.searchValue) || this.getCategories(p.categories).includes(Number(this.searchValue)))
        this.icon = "fa fa-arrow-left";
      } else {
        this.searchValue = '';
        this.projects = this.allProjects;
        this.icon = "fa fa-search";
    }
  }

  UpdateProjectStatus(p: Project, newStatus: string) {
    p.status = newStatus;
    var notifType: string;
    if(newStatus == 'publié')
      notifType = "Publication";
    else if(newStatus == "refusé")
      notifType = "Rejection";
    else
      notifType = "Canceling";
    this.projectService.updateProjectAndNotify(p, notifType).subscribe(
      () => {
          console.log('Project status successfully updated !');
          this.loadProjects();
        },
        (err) => console.log(err)
      );
  }

  deleteProject(p: Project) {
    if (confirm("Supprimer le projet n°" + p.id + " de titre '" + p.title + "' ?")) {
      this.projectService.deleteProjectAndNotify(p).subscribe(
        () => {
          console.log('Project deleted successfully');
          this.loadProjects();
        },
        (err) => console.log(err)
      );
    }
  }

  getCategories(categories: Category[]) {
    return categories.map(c => c.id);
  }
}
