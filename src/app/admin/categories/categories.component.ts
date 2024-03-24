import { Component, OnInit } from '@angular/core';
import { isEqual } from 'lodash';
import { Category } from 'src/app/_models/category';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css', '../admin.component.css']
})
export class CategoriesComponent implements OnInit {

  displayStyle = "none";
  formType = '';
  category = new Category();
  unmodifiedCategory?: Category;
  alert = '';
  success = '';
  allCategories!: Category[];
  categories!: Category[];
  domain?: string;
  searchValue = '';
  icon = "fa fa-search";

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();

  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.allCategories = data;
        console.log(this.allCategories)
        this.filter();
      }
    )
  }
  filter() {
    if (this.domain)
      this.categories = this.allCategories.filter(c => c.domain == this.domain)
    else
      this.categories = this.allCategories;
  }
  search() {
    if(this.searchValue)
      if(this.icon == "fa fa-search") {
        this.categories = this.allCategories.filter(c => c.id!.toString().includes(this.searchValue) || c.name.toLowerCase().includes(this.searchValue) || c.description?.toLowerCase().includes(this.searchValue));
        this.icon = "fa fa-arrow-left";
      } else {
        this.searchValue = '';
        this.categories = this.allCategories;
        this.icon = "fa fa-search";
    }
  }
  deleteCategory(c: Category) {
    if (confirm("Supprimer la catégorie ' " + c.name + "' ?")) {
      this.categoryService.deleteCategory(c).subscribe(
        () => {
          console.log('Category deleted successfully');
          this.loadCategories();
        },
        (err) => console.log(err)
      );
    }
  }

  addCategory() {
    this.displayStyle = 'block';
    this.formType = 'Ajout';
  }

  editCategory(c: Category) {
    this.displayStyle = 'block';
    this.formType = 'Modification';
    this.unmodifiedCategory = { ...c };
    this.category = c;
  }

  closeForm() {
    this.displayStyle = 'none';
    this.category = new Category();
    this.formType = '';
    this.alert = '';
  }

  submitAddForm() {
    this.alert = '';
    if (!this.category.name || !this.category.description || !this.category.domain)
      this.alert = "Remplir tous les champs !";
    else
      this.categoryService.createCategory(this.category).subscribe(
        () => {
          console.log('Category added successfully');
          this.closeForm();
          this.loadCategories();
        },
        (err) => console.log(err)
      );
  }

  submitEditForm() {
    this.alert = '';
    if (!this.category.name || !this.category.description || !this.category.domain)
      this.alert = "Remplir tous les champs !";
    else if (isEqual(this.unmodifiedCategory, this.category))
      this.alert = "Aucune modification est effectuée !";
    else
      this.categoryService.updateCategory(this.category).subscribe(
        () => {
          console.log('Category updated successfully');
          this.closeForm();
          this.loadCategories();
        },
        (err) => console.log(err)
      );
  }
}
