import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  public getCategoriesByDomain(domain: string) {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}/categories/domain/${domain}`);
  }

  public getCategory(id: number) {
    return this.httpClient.get<Category>(`${environment.apiUrl}/categories/${id}`);
  }
}
