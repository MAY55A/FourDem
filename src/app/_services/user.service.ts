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

  public readUser(email: string) {
    return this.httpClient.get<User>(`${environment.apiUrl}/Users/${email}`);
  }

  public getProfile() {
    const useremail = this.authService.getUserEmailFromToken();
    if(useremail)
      return this.readUser(useremail);
    else
      throw new Error('User email not found in token.');
  }
  public readUsers() {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/Users`);
  }

  public createUser(User: User) {
    return this.httpClient.post<User>(`${environment.apiUrl}/Users/create`, User);
  }

  public updateUser(User: User) {
    return this.httpClient.put<User>(`${environment.apiUrl}/Users/${User.id}/update`, User);
  }

  public deleteUser(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/Users/${id}/delete`);
  }
}
