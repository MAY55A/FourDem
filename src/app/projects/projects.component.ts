import { Component, OnInit } from '@angular/core';
import { Category } from '../_models/category';
import { CategoryService } from '../_services/category.service';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', '../profile/my-projects/my-projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private categoryService: CategoryService, private projectService: ProjectService) { }

  domains = ["Tous", "It", "Comptabilité", "Influence"];
  categories: Category[] = [];
  allProjects!: Project[];
  projects: Project[] = [];
  domain = this.domains[0];
  category = 'Tous';
  searchValue = '';
  ngOnInit(): void {
    this.getProjects();
  }

  getCategories() {
    this.category = "Tous";
    this.categoryService.getCategoriesByDomain(this.domain).subscribe(
      (ctgs) => {
        this.categories = ctgs;
        this.getProjects();
      }
    )
  }

  getProjects() {
    if (this.category!='Tous') {
      this.projectService.getProjectsByCategory(this.category).subscribe(
        (projects) => {
          this.allProjects = projects.filter(p => p.status == 'publié');
          this.projects = [...this.allProjects];
        }
      )
    } else if (this.domain=='Tous'){
      this.projectService.getPublishedProjects().subscribe(
        (projects) => {
          this.allProjects = projects.filter(p => p.status == 'publié');
          this.projects = [...this.allProjects];
        }
      )
    } else {
      this.allProjects = [];
      this.categories.forEach((c) => {
        this.projectService.getProjectsByCategory(c.name).subscribe(
          (projects) => {
            this.allProjects.push(...projects.filter(p => p.status == 'publié'));
            this.projects = [...this.allProjects];
          }
        )
      })
    }
  }

  search() {
    this.projects = this.allProjects?.filter(p => p.title.includes(this.searchValue) || p.description.includes(this.searchValue));
  }
}
