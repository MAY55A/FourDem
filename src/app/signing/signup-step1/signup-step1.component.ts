import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/user.service';
import { SHA256, enc } from "crypto-js";
import { Router } from '@angular/router';
import { SigningComponent } from '../signing.component';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-signup-step1',
  templateUrl: './signup-step1.component.html',
  styleUrls: ['./signup-step1.component.css', '../signing.component.css']
})
export class SignupStep1Component implements OnInit {
  name!: string;
  email!: string;
  password1!: string;
  password2!: string;
  alert: string = "";

  constructor(private userService: UserService, private router: Router, private signup: SigningComponent) { }

  ngOnInit(): void {

  }
  submit(): void {
    this.alert = "";
    if (!this.name || !this.email || !this.password1 || !this.password2)
      this.alert = "Tous les Champs doivent être remplis !";
    else if (!this.email.includes("@")) {
      console.log("-2");
      this.alert = "Email non valide !";
    }
    else {
      this.userExistes(this.email);
      if(!this.alert) {
        if (this.password1.length < 8)
          this.alert = "Le mot de passe doit contenir au moins 8 caractères !";
        else if (this.password1 != this.password2)
          this.alert = "Mot de passe différent !";
        else {
          this.signup.newUser = {
            name: this.name,
            email: this.email,
            hash: SHA256(this.password1).toString(enc.Hex),
            type: ''
          };
          this.router.navigate(['compte/creation2']);
        }
      }
    }
  }
  userExistes(email: string) {
    this.userService.readUser(email).subscribe(
      (user: User) => {
        console.log(user);
        if(user)
          this.alert = "Email déjà utilisé !";
      },
      (error) => {
        console.log(error);
      }
     );
  }
}