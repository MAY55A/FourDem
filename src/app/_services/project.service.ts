
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../_models/project';
import { Notification } from '../_models/notification';
import { environment } from 'src/environments/environment.development';
import { Observable, forkJoin, mergeMap } from 'rxjs';
import { NotificationService } from './notification.service';
import { ServiceService } from './service.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private httpClient: HttpClient, private notificationService: NotificationService, private serviceService: ServiceService) { }

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

  public getProjectsByCategory(catid: number) {
    return this.httpClient.get<Project[]>(`${environment.apiUrl}/projects/category/${catid}`);
  }
  
  public createProject(project: Project) {
    return this.httpClient.post<Project>(`${environment.apiUrl}/projects/create`, project).pipe(
      mergeMap(() => {
        const notification = {
          type: "projectCreation",
          content: `L'utilisateur <a routerLink='/profile/${project.proposer.id}'>${project.proposer.name}</a> a créé un nouveau projet de titre <a routerLink='/projects/project/${project.id}'>${project.title}</a> !`,
        };
        return this.notificationService.createNotification(notification);
      })
    );
  }

  public updateProjectAndNotify(project: Project, type: string) {
    return this.httpClient.put<Project>(`${environment.apiUrl}/projects/${project.id}/update`, project).pipe(
      mergeMap(() => this.serviceService.getServicesByProject(project.id!)),
      mergeMap((services) => {
        if(type == "Finishing")
          var status = "terminé";
        else if(type == "Rejection")
          var status = "refusé";
        else if(type == "Publication")
          var status = "publié";
        else if(type == "Modification")
          var status = "modifié";
        else
          var status = "annulé";
        const notificationObservables: Observable<Notification>[] = [];
        services.forEach((s) => {
          var notification = {
            type: `project${type}`,
            content: `Le projet <a routerLink='/projects/project/${project.id}'>${project.title}</a> dont vous avez proposé un service a été ${status}!`,
            userId: s.proposer.id,
          };
          notificationObservables.push(this.notificationService.createNotification(notification));
        });
        if(status == "terminé" || status == "modifié") {
          const adminNotification = {
            type: `project${type}`,
            content: `Le projet <a routerLink='/projects/project/${project.id}'>${project.title}</a> a été ${status} !`,
          };
          notificationObservables.push(this.notificationService.createNotification(adminNotification));
        } else {
          const proposerNotification = {
            type: `project${type}`,
            content: `Votre projet <a routerLink='/projects/project/${project.id}'>${project.title}</a> a été ${status} !`,
            userId: project.proposer.id
          };
          notificationObservables.push(this.notificationService.createNotification(proposerNotification));
        }
        return forkJoin(notificationObservables);
      })
    );
  }

  public deleteProjectAndNotify(p: Project) {
    return this.httpClient.delete(`${environment.apiUrl}/projects/${p.id}/delete`).pipe(
      mergeMap(() => this.serviceService.getServicesByProject(p.id!)),
      mergeMap((services) => {
        const notificationObservables: Observable<Notification>[] = [];
        services.forEach((s) => {
          const notification = {
            type: "projectDeletion",
            content: `Le projet de titre '${p.title}' dont vous avez proposé un service a été supprimé !`,
            userId: s.proposer.id,
          };
          notificationObservables.push(this.notificationService.createNotification(notification));
        });
        const adminNotification = {
          type: "projectDeletion",
          content: `Le projet d'ID ${p.id} et de titre '${p.title}' a été supprimé !`,
        };
        notificationObservables.push(this.notificationService.createNotification(adminNotification));
        const proposerNotification = {
          type: "projectDeletion",
          content: `Votre projet de titre '${p.title}' a été supprimé !`,
          userId: p.proposer.id
        };
        notificationObservables.push(this.notificationService.createNotification(proposerNotification));
        return forkJoin(notificationObservables);
      })
    );
  }
}
