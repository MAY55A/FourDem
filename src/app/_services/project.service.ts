
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../_models/project';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private httpClient: HttpClient) { }

  public getProject(id: number) {
    return this.httpClient.get<Project>(`${environment.apiUrl}/projects/${id}`);
  }

  public getProjects() {
    return this.httpClient.get<Project[]>(`${environment.apiUrl}/projects`);
  }

  public getProjectsByUser(user: number) {
    return this.httpClient.get<Project[]>(`${environment.apiUrl}/projects/user/${user}`);
  }

  public getPublishedProjects() {
    return this.httpClient.get<Project[]>(`${environment.apiUrl}/projects/published/all`);
  }

  public getProjectsByCategory(cat: string) {
    return this.httpClient.get<Project[]>(`${environment.apiUrl}/projects/category/${cat}`);
  }
  
  public createProject(project: Project) {
    return this.httpClient.post<Project>(`${environment.apiUrl}/projects/create`, project);
  }

  public updateProject(project: Project) {
    return this.httpClient.put<Project>(`${environment.apiUrl}/projects/${project.id}/update`, project);
  }

  public deleteProject(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/projects/${id}/delete`);
  }
}
