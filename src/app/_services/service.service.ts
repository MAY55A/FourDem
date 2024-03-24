import { Injectable } from '@angular/core';
import { Service } from '../_models/service';
import { Notification } from '../_models/notification';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { Observable, forkJoin, mergeMap } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }

  public getService(id: number) {
    return this.httpClient.get<Service>(`${environment.apiUrl}/services/${id}`);
  }

  public getAllServices() {
    return this.httpClient.get<Service[]>(`${environment.apiUrl}/services`);
  }
    
  public getServicesByUser(user: number) {
    return this.httpClient.get<Service[]>(`${environment.apiUrl}/services/user/${user}`);
  }
  
  public getCountByDomain(domain: string) {
    return this.httpClient.get<number>(`${environment.apiUrl}/services/domain/${domain}/total`);
  }

  public getServicesByDomain(domain: string) {
    return this.httpClient.get<Service[]>(`${environment.apiUrl}/services/domain/${domain}`);
  }
  
  public getServicesByProject(project: number) {
    return this.httpClient.get<Service[]>(`${environment.apiUrl}/services/project/${project}`);
  }
  
  public createService(service: Service) {
    return this.httpClient.post<Service>(`${environment.apiUrl}/services/create`, service).pipe(
      mergeMap(() => {
        const notificationObservables: Observable<Notification>[] = [];
        const adminNotification = {
          type: "ServiceCreation",
          content: `L'utilisateur d'ID ${service.proposer.id} <a routerLink='/profile/${service.proposer.id}'>${service.proposer.name}</a> a proposé un nouveau service au projet d'ID ${service.project.id} <a routerLink='/projects/project/${service.project.id}'>${service.project.title}</a> !`
        };
        notificationObservables.push(this.notificationService.createNotification(adminNotification));
        const projectProposerNotification = {
          type: "ServiceCreation",
          content: `<a routerLink='/profile/${service.proposer.id}'>${service.proposer.name}</a> a proposé un nouveau service à votre projet <a routerLink='/projects/project/${service.project.id}'>${service.project.title}</a> !`,
          userId: service.project.proposer.id
        };
        notificationObservables.push(this.notificationService.createNotification(projectProposerNotification));
        return forkJoin(notificationObservables);
      })
    );
  }

  public updateServiceAndNotify(service: Service, type: string) {
    return this.httpClient.put<Service>(`${environment.apiUrl}/services/${service.id}/update`, service).pipe(
      mergeMap(() => {
        if(type == "Acceptation")
          var status = "accepté";
        else if(type == "Rejection")
          var status = "refusé";
        else if(type == "Modification")
          var status = "modifié";
        else
          var status = "annulé";
        const notificationObservables: Observable<Notification>[] = [];
        var adminNotification = {
          type: `service${type}`,
          content: `Le service d'ID ${service.id} proposé par <a routerLink='/profile/${service.proposer.id}'>${service.proposer.name}</a> au projet d'ID ${service.project.id} <a routerLink='/projects/project/${service.project.id}'>${service.project.title}</a> a été ${status}!`,
        };
        notificationObservables.push(this.notificationService.createNotification(adminNotification));
        if(status == "modifié") {
          const projectProposerNotification = {
            type: `service${type}`,
            content: `Le service proposé par <a routerLink='/profile/${service.proposer.id}'>${service.proposer.name}</a> à votre projet <a routerLink='/projects/project/${service.project.id}'>${service.project.title}</a> a été ${status} !`,
            userId: service.project.proposer.id
          };
          notificationObservables.push(this.notificationService.createNotification(projectProposerNotification));
        } else {
          const proposerNotification = {
            type: `service${type}`,
            content: `Votre service proposé à ${new DatePipe('en-US').transform(service.proposedAt, 'HH:mm, yyyy-MM-dd')} au projet <a routerLink='/projects/project/${service.project.id}'>${service.project.title}</a> a été ${status} !`,
            userId: service.proposer.id
          };
          notificationObservables.push(this.notificationService.createNotification(proposerNotification));
        }
        console.log(notificationObservables)
        return forkJoin(notificationObservables);
      })
    );
  }

  public updateServiceEvaluationAndNotify(service: Service, type: string) {
    return this.httpClient.put<Service>(`${environment.apiUrl}/services/${service.id}/update`, service).pipe(
      mergeMap(() => {
        if(type == "EvaluationCanceling") {
          var content1 = `L'utilisateur <a routerLink='/profile/${service.project.proposer.id}'>${service.project.proposer.name}</a> a annulé son evaluation du service d'ID ${service.id} proposé par <a routerLink='/profile/${service.proposer.id}'>${service.proposer.name}</a> au projet d'ID ${service.project.id} <a routerLink='/projects/project/${service.project.id}'>${service.project.title}</a> !`;
          var content2 = `L'utilisateur <a routerLink='/profile/${service.project.proposer.id}'>${service.project.proposer.name}</a> a annulé son evaluation de votre service proposé à son projet <a routerLink='/projects/project/${service.project.id}'>${service.project.title}</a> !`;
        } else {
          if(type == "Liking")
            var evaluation = "satisfaisant";
          else
            var evaluation = "insatisfaisant";
          var content1 = `L'utilisateur <a routerLink='/profile/${service.project.proposer.id}'>${service.project.proposer.name}</a> trouve le service d'ID ${service.id} proposé par <a routerLink='/profile/${service.proposer.id}'>${service.proposer.name}</a> au projet d'ID ${service.project.id} <a routerLink='/projects/project/${service.project.id}'>${service.project.title}</a> ${evaluation} !`;
          var content2 = `L'utilisateur <a routerLink='/profile/${service.project.proposer.id}'>${service.project.proposer.name}</a> trouve votre service proposé à son projet <a routerLink='/projects/project/${service.project.id}'>${service.project.title}</a> ${evaluation} !`;
        }
        const notificationObservables: Observable<Notification>[] = [];
        var adminNotification = {
          type: `service${type}`,
          content: content1
        };
        notificationObservables.push(this.notificationService.createNotification(adminNotification));
        const proposerNotification = {
            type: `service${type}`,
            content: content2,
            userId: service.proposer.id
        };
        notificationObservables.push(this.notificationService.createNotification(proposerNotification));
        return forkJoin(notificationObservables);
      })
    );
  }

  public deleteServiceAndNotify(service: Service) {
    return this.httpClient.delete(`${environment.apiUrl}/services/${service.id}/delete`).pipe(
      mergeMap(() => {
        const notificationObservables: Observable<Notification>[] = [];
        const proposerNotification = {
          type: "serviceDeletion",
          content: `Votre service proposé à ${new DatePipe('en-US').transform(service.proposedAt, 'HH:mm, yyyy-MM-dd')} au projet <a routerLink='/projects/project/${service.project.id}'>${service.project.title}</a> a été supprimé !`,
          userId: service.proposer.id,
        };
        notificationObservables.push(this.notificationService.createNotification(proposerNotification));
        const adminNotification = {
          type: "serviceDeletion",
          content: `Le service d'ID ${service.id}, de proposeur <a routerLink='/profile/${service.proposer.id}'>${service.proposer.name}</a> et proposé au projet <a routerLink='/projects/project/${service.project.id}'>${service.project.title}</a> a été supprimé !`,
        };
        notificationObservables.push(this.notificationService.createNotification(adminNotification));
        const projectProposerNotification = {
          type: "serviceDeletion",
          content: `Le service proposé par <a routerLink='/profile/${service.proposer.id}'>${service.proposer.name}</a> à votre projet <a routerLink='/projects/project/${service.project.id}'>${service.project.title}</a> a été supprimé !`,
          userId: service.project.proposer.id
        };
        notificationObservables.push(this.notificationService.createNotification(projectProposerNotification));
        return forkJoin(notificationObservables);
      })
    );
  }
}
