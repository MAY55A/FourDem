import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Category } from 'src/app/_models/category';
import { Project } from 'src/app/_models/project';
import { CategoryService } from 'src/app/_services/category.service';
import { ProjectService } from 'src/app/_services/project.service';
import { AppComponent } from 'src/app/app.component';
import { isEqual } from 'lodash';


@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  constructor(private categoryService: CategoryService, private app: AppComponent, private projectService: ProjectService, private route: ActivatedRoute) { }
  user = this.app.user;
  status!: string | null;
  allProjects!: Project[];
  projects: Project[] = [];
  displayStyle = "none";
  searchValue = '';
  formType?: string;
  alert?: string;
  success?: string;
  domains = ["It", "Comptabilité", "Influence"];
  checkedDomains = [false, false, false];
  categories: Category[] = [];
  checkedCategories!: boolean[];
  selectedCategories: Set<string> = new Set();
  project = new Project();
  unmodifiedProject?: Project;

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

  getCategories() {
    this.categories = [];
    this.checkedDomains.forEach((domain, i) => {
      if (domain) {
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
      if (checked)
        this.selectedCategories.add(this.categories[i].name)
    })
  }

  openProjectForm() {
    this.formType = "Ajout";
    this.displayStyle = "block";
  }

  closeProjectForm() {
    this.project = new Project();
    this.categories = [];
    this.checkedDomains = [false, false, false];
    this.success = '';
    this.displayStyle = "none";
  }
  checkFormFields() {
    this.alert = '';
    if (!this.project.title)
      this.alert = "vous devez donner un titre à votre projet !";
    else if (!this.project.description)
      this.alert = "vous devez introduire une description de votre projet !";
    else if (this.project.description.length < 250)
      this.alert = "la description doit contenir au moin 250 caractères !";
    else if (!this.checkedDomains.includes(true) && this.project.categories.length == 0)
      this.alert = "vous devez choisir au moin un domaine !";
    else if (this.selectedCategories.size == 0 && this.project.categories.length == 0)
      this.alert = "vous devez choisir au moin une catégorie !";
  }

  submitAddProjectForm() {
    this.checkFormFields();
    if (!this.alert) {
      this.project.proposer = this.user!.id!;
      this.project.categories = [...this.selectedCategories].join();
      this.projectService.createProject(this.project).subscribe(
        (data) => {
          console.log("creating ...");
          this.success = 'Projet proposé !';
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      );
    }
  }


  editProject(project: Project) {
    this.project = { ...project };
    this.unmodifiedProject = { ...project };
    this.openProjectForm();
    this.formType = "Modification";
  }

  removeCategory(cat: string) {
    this.project.categories = this.project.categories.split(",").filter(c => c != cat).join(",");
  }

  submitEditProjectForm() {
    this.checkFormFields();
    if (isEqual(this.project, this.unmodifiedProject))
      this.alert = "aucune modification est affectée !";
    if (!this.alert) {
      if (this.selectedCategories.size > 0) {
        var selectedCategories = [...this.selectedCategories].join();
        this.project.categories = this.project.categories ? `${this.project.categories},${selectedCategories}` : selectedCategories;
      }
      this.projectService.updateProject(this.project).subscribe(
        (data) => {
          console.log("updating ...");
          this.success = 'Projet modifié !';
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      )
    }
  }

  finishProject(p: Project) {
    p.status = "terminé";
    this.projectService.updateProject(p).subscribe(
      (data) => {
        console.log("updating ...");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    )
  }

  deleteProject(id: number) {
    if (confirm('Si vous supprimez ce projet, vous ne pouvez jamais le récupérer, vouler vous le supprimer ?')) {
      this.projectService.deleteProject(id).subscribe(
        () => {
          console.log('Project deleted successfully');
          window.location.reload();
        },
        (err) => console.log(err)
      );
    }
  }

  search() {
    this.projects = this.allProjects?.filter(p => p.title.includes(this.searchValue) || p.categories.includes(this.searchValue));
  }
}
