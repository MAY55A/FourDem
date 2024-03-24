import { Component, OnInit } from '@angular/core';
import { Category } from '../_models/category';
import { CategoryService } from '../_services/category.service';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/project';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', '../profile/my-projects/my-projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private categoryService: CategoryService, private projectService: ProjectService, private route: ActivatedRoute) { }

  domains = ["Tous", "IT", "Comptabilité", "Influence"];
  categories: Category[] = [];
  allProjects!: Project[];
  projects: Project[] = [];
  domain = this.domains[0];
  category?: Category;
  searchValue = '';
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
    this.getProjects();
  }

  getCategories() {
    this.category = undefined;
    this.categoryService.getCategoriesByDomain(this.domain).subscribe(
      (ctgs) => {
        this.categories = ctgs;
        this.getProjects();
      }
    )
  }

  pickCategory(c: Category) {
    if(c.id === this.category?.id)
      this.category = undefined;
    else
      this.category = c;
    this.getProjects();
  }

  getProjects() {
    if(this.domain == 'Tous') {
      this.projectService.getPublishedProjects().subscribe(
        (projects) => {
          this.allProjects = projects;
          this.projects = [...this.allProjects];
        }
      )
    } else {
        if(this.category) {
          console.log(typeof(this.category))
          this.allProjects = this.category.projects.filter(p => p.status == 'publié');
        } else {
          this.allProjects = [];
          this.categories.forEach((c) => {
            this.allProjects.push(...c.projects.filter(p => p.status == 'publié' && !this.allProjects.some(item => JSON.stringify(item) === JSON.stringify(p))));
          })
        }
        this.projects = [...this.allProjects];
      }
    }

  search() {
    this.projects = this.allProjects?.filter(p => p.title.toLowerCase().includes(this.searchValue) || p.description.toLowerCase().includes(this.searchValue) || p.proposer.name.toLowerCase().includes(this.searchValue));
  }
}
