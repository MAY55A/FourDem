import { Injectable } from "@angular/core";
import { CategoryService } from "./category.service";
import { Category } from "../_models/category";
import { Project } from "../_models/project";
import { isEqual } from "lodash";
import { ProjectService } from "./project.service";
import { User } from "../_models/user";
import { NotificationService } from "./notification.service";

@Injectable({
    providedIn: 'root'
})
export class OptionsService {
    constructor(private categoryService: CategoryService, private projectService: ProjectService, private notificationService: NotificationService) { }
    status!: string | null;
    displayStyle = "none";
    formType?: string;
    alert?: string;
    success?: string;
    domains = ["It", "Comptabilité", "Influence"];
    checkedDomains = [false, false, false];
    categories: Category[] = [];
    checkedCategories!: boolean[];
    selectedCategories: Set<Category> = new Set();
    project = new Project();
    unmodifiedProject?: Project;


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
        console.log(this.checkedCategories)
        this.checkedCategories.forEach((checked, i) => {
            if (checked)
                this.selectedCategories.add(this.categories[i])
        })
    }
    categoryIsIncluded(cat: Category) {
        return this.project.categories?.map(c => c.id).includes(cat.id);
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
        this.alert = '';
        this.displayStyle = "none";
    }
    checkFormFields() {
        this.alert = '';
        if (!this.project.title)
            this.alert = "Vous devez donner un titre à votre projet !";
        else if (!this.project.description)
            this.alert = "Vous devez introduire une description de votre projet !";
        else if (this.project.description.length < 150)
            this.alert = "La description doit contenir au moins 150 caractères !";
        else if (!this.checkedDomains.includes(true) && this.project.categories.length == 0)
            this.alert = "Vous devez choisir au moins un domaine !";
        else if (this.selectedCategories.size == 0 && this.project.categories.length == 0)
            this.alert = "Vous devez choisir au moins une catégorie !";
    }

    submitAddProjectForm(proposer: User) {
        this.checkFormFields();
        if (!this.alert) {
            this.project.proposer = proposer;
            this.project.categories = [...this.selectedCategories];
            this.projectService.createProject(this.project).subscribe(
                (data) => {
                    console.log("creating ...");
                    this.success = 'Projet proposé !';
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            );
        }
    }


    editProject(project: Project) {
        this.project = { ...project };
        this.unmodifiedProject = { ...project };
        console.log(this.project)
        this.openProjectForm();
        this.formType = "Modification";
    }

    removeCategory(cat: Category) {
        this.project.categories = this.project.categories.filter(c => c.id != cat.id);
    }

    submitEditProjectForm() {
        this.checkFormFields();
        if (this.selectedCategories.size > 0) {
            this.project.categories = this.project.categories.concat([...this.selectedCategories]);
            console.log(this.selectedCategories)
            console.log(this.project.categories)
        }
        console.log(this.project, this.unmodifiedProject)
        if (isEqual(this.project, this.unmodifiedProject))
            this.alert = "Aucune modification est affectée !";
        if (!this.alert) {

            this.projectService.updateProjectAndNotify(this.project, "Modification").subscribe(
                () => {
                    console.log("updating ...");
                    this.success = 'Projet modifié !';
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            )
        }
    }

    finishProject(p: Project) {
        p.status = "terminé";
        this.projectService.updateProjectAndNotify(p, "Finishing").subscribe(
            () => {
                console.log('Project successfully finished !');
                setTimeout(() => {
                window.location.reload();
                }, 3000);
            },
            (err) => console.log(err)
        );
    }

    deleteProject(p: Project) {
        if (confirm('Si vous supprimez ce projet, vous ne pouvez jamais le récupérer, vouler vous le supprimer ?')) {
            this.projectService.deleteProjectAndNotify(p).subscribe(
                () => {
                    console.log('Project deleted successfully');
                    window.location.reload();
                },
                (err) => console.log(err)
            );
        }
    }
}