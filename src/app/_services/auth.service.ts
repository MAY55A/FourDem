import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'access_token';

  constructor(private http: HttpClient) {
  }
    
  login(email: string, hash: string): Observable<{ access_token: string }> {
    const body = { email, hash };
    return this.http.post<{ access_token: string }>(`${environment.apiUrl}/auth/login`, body);
  }
  
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return Number(payload.sub);
      } catch (error) {
        console.error('Error decoding JWT payload:', error);
      }
    }
    return null;
  }
}
