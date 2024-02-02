import { Component } from '@angular/core';
import { Category } from 'src/app/_models/category';
import { Project } from 'src/app/_models/project';
import { CategoryService } from 'src/app/_services/category.service';
import { ProjectService } from 'src/app/_services/project.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent {

  constructor(private categoryService: CategoryService, private app: AppComponent, private projectService: ProjectService) {}
  user = this.app.user;
  displayStyle = "none";
  alert?: string;
  domains = ["It", "Comptabilité", "Influence"];
  checkedDomains = [false, false, false];
  categories: Category[] = [];
  checkedCategories!: boolean[];
  selectedCategories: Set<number> = new Set();
  project = new Project();

  openAddProjectForm(){
    this.displayStyle = "block";
  }
  getCategories() {
    this.categories = [];
    this.checkedDomains.forEach((domain, i) => {
      if(domain) {
        this.categoryService.getCategoriesByDomain(this.domains[i]).subscribe(
          (cat) => {
            this.categories.push(...cat);
            this.checkedCategories = new Array(this.categories.length).fill(false);
          }
        )
      }
    });
  }
  updateSelectedCategories() {
    this.selectedCategories = new Set();
    this.checkedCategories.forEach((checked, i) => {
      if(checked)
        this.selectedCategories.add(this.categories[i].id)
    })
  }
  closeAddProjectForm(){
    this.displayStyle = "none";
  }
  submitAddProjectForm(){
    this.alert = '';
    if(!this.project.title)
      this.alert = "vous devez donner un titre à votre projet !";
    else if(!this.project.description)
      this.alert = "vous devez introduire une description de votre projet !";
    else if(this.project.description.length < 250)
      this.alert = "la description doit contenir au moin 250 caractères !";
    else if (!this.checkedDomains.includes(true))
      this.alert = "vous devez choisir au moin un domaine !";
    else if (this.selectedCategories.size == 0)
      this.alert = "vous devez choisir au moin une catégorie !";
    else {
      this.project.proposer = this.user!.id!;
      this.project.categories = "*" + [...this.selectedCategories].join("*") + "*";
      console.log(this.project);
      this.projectService.createProject(this.project).subscribe(
        (data) => {
          console.log("creating ...")
        }
      );
    }
  }
}
