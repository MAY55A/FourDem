import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Category } from '../_models/category';
import { mergeMap } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }

  public getCategories() {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  public getCategoriesByDomain(domain: string) {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}/categories/domain/${domain}`);
  }

  public getCategory(id: number) {
    return this.httpClient.get<Category>(`${environment.apiUrl}/categories/${id}`);
  }

  public createCategory(category: Category) {
    return this.httpClient.post<Category>(`${environment.apiUrl}/categories/create`, category).pipe(
      mergeMap((ctg) => {
        const notification = {
          type: "default",
          content: `Une nouvelle catégorie du domaine " ${ctg.domain} " a été ajotée : '${ctg.name}' !`
        };
        return this.notificationService.createNotification(notification);
      })
    );
  }

  public updateCategory(category: Category) {
    return this.httpClient.put<Category>(`${environment.apiUrl}/categories/${category.id}/update`, category).pipe(
      mergeMap(() => {
        const notification = {
          type: "default",
          content: `La catégorie '${category.name}' du domaine " ${category.domain} " a été modifiée !`
        };
        return this.notificationService.createNotification(notification);
      })
    );
  }

  public deleteCategory(category: Category) {
    return this.httpClient.delete(`${environment.apiUrl}/categories/${category.id}/delete`).pipe(
      mergeMap(() => {
        const notification = {
          type: "default",
          content: `La catégorie '${category.name}' du domaine " ${category.domain} " a été supprimée !`
        };
        return this.notificationService.createNotification(notification);
      })
    );
  }
}
