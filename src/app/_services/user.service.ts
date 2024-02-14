import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  public readUserByEmail(email: string) {
    return this.httpClient.get<User>(`${environment.apiUrl}/Users/email:${email}`);
  }

  public readUserById(id: number) {
    return this.httpClient.get<User>(`${environment.apiUrl}/Users/id:${id}`);
  }

  public getProfile() {
    const userid = this.authService.getUserIdFromToken();
    if(userid)
      return this.readUserById(userid);
    else
      throw new Error('User id not found in token.');
  }
  public readUsers() {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/Users`);
  }

  public createUser(User: User) {
    return this.httpClient.post<User>(`${environment.apiUrl}/Users/create`, User);
  }

  public updateUser(user: any) {
    return this.httpClient.put<any>(`${environment.apiUrl}/Users/${user.id}/update`, user);
  }

  public deleteUser(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/Users/${id}/delete`);
  }
}
