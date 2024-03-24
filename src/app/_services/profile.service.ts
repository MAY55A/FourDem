import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  setUser(user: User | null) {
    this.userSubject.next(user);
  }
}
