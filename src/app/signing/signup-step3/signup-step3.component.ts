import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SigningComponent } from '../signing.component';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-signup-step3',
  templateUrl: './signup-step3.component.html',
  styleUrls: ['./signup-step3.component.css','../signing.component.css']
})
export class SignupStep3Component implements OnInit{
  constructor(private signup: SigningComponent, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
  }
  chooseDomain(d: string): void {
    this.signup.newUser.domain = d;
    this.userService.createUser(this.signup.newUser).subscribe(data => {
      this.router.navigate(['/profile']);
    });
  }
}
