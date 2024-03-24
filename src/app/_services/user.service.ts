import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService, private notificationService: NotificationService) { }

  public readUserByEmail(email: string) {
    return this.httpClient.get<User>(`${environment.apiUrl}/Users/email:${email}`);
  }

  public readUserById(id: number) {
    return this.httpClient.get<User>(`${environment.apiUrl}/Users/id:${id}`);
  }

  public getHash(email: string) {
    return this.httpClient.get<User>(`${environment.apiUrl}/Users/hash/${email}`);
  }

  public getProfile() {
    const userid = this.authService.getUserIdFromToken();
    if(userid)
      return this.readUserById(userid);
    console.log("No loggedin user !");
    return null;
  }
  public readUsers() {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/Users`);
  }

  public createUser(user: User) {
    return this.httpClient.post<User>(`${environment.apiUrl}/Users/create`, user).pipe(
      mergeMap((createdUser) => {
        const notification = {
          type: "userCreation",
          content: `Un nouveau utilisateur '${createdUser.name}' de type '${createdUser.type}' et d'ID ${createdUser.id} a été créé !`
        };
        return this.notificationService.createNotification(notification);
      })
    );
  }

  public updateUser(user: any) {
    return this.httpClient.put<any>(`${environment.apiUrl}/Users/${user.id}/update`, user);
  }

  public deleteUser(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/Users/${id}/delete`).pipe(
      mergeMap((id) => {
        const notification = {
          type: "userDeletion",
          content: `Le compte d'utilisateur d'ID ${id} a été supprimé !`
        };
        return this.notificationService.createNotification(notification);
      })
    );}
}
