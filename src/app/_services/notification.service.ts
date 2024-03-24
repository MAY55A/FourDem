import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Notification } from '../_models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  public getNotification(id: number) {
    return this.httpClient.get<Notification>(`${environment.apiUrl}/notifications/${id}`);
  }

  public getNotificationsByUser(userid: number) {
    return this.httpClient.get<Notification[]>(`${environment.apiUrl}/notifications/user/${userid}`);
  }

  public getAdminNotifications() {
    return this.httpClient.get<Notification[]>(`${environment.apiUrl}/notifications/admin`);
  }

  public createNotification(notification: Notification) {
    return this.httpClient.post<Notification>(`${environment.apiUrl}/notifications/create`, notification);
  }

  public updateNotification(notification: Notification) {
    return this.httpClient.put<Notification>(`${environment.apiUrl}/notifications/${notification.id}/update`, notification);
  }

  public deleteNotification(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/notifications/${id}/delete`);
  }

  getClass(type: string) {
    if(type.includes('Acceptation'))
      return "Message-icon green";
    else if(type.includes('Rejection'))
      return "Message-icon orange";
    else if(type.includes('Creation'))
      return "Message-icon yellow";
    else if(type.includes('Deletion'))
      return "Message-icon red";
    else if(type.includes('Canceling'))
      return "Message-icon grey";
    else if(type.includes('Modification'))
      return "Message-icon pink";
    else if(type.includes('warning'))
      return "Message-icon yellow";
    if(type.includes('Liking'))
      return "Message-icon golden";
    else if(type.includes('Disliking'))
      return "Message-icon brown";
    else
      return "Message-icon";
  }

  getIcon(type: string) {
    if(type.includes('Acceptation'))
      return "fa fa-check-circle-o";
    else if(type.includes('Rejection'))
      return "fa fa-times-circle-o";
    else if(type.includes('Creation'))
      return "fa fa-plus-square-o";
    else if(type.includes('Deletion'))
      return "fa fa-minus-square-o";
    else if(type.includes('Canceling'))
      return "fa fa-undo";
    else if(type.includes('Modification'))
      return "fa fa-pencil-square-o";
    else if(type.includes('warning'))
      return "fa fa-warning";
    if(type.includes('Liking'))
      return "fa fa-thumbs-o-up";
    else if(type.includes('Disliking'))
      return "fa fa-thumbs-o-down";
    else
      return "fa fa-exclamation";
  }
}