import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SHA256, enc } from 'crypto-js';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css','../signing.component.css']
})
export class SigninComponent implements OnInit{
  email!: string;
  password!: string;
  alert = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
  }

  login() {
    if(this.email && this.password) {
    var hash = SHA256(this.password).toString(enc.Hex);
    console.log(this.password,hash);
    this.authService.login(this.email, hash).subscribe(
      (response) => {
        console.log('Login successful:', response.access_token);
        this.authService.saveToken(response.access_token);
        // Save token to local storage or use it as needed
        this.router.navigate(['/profile']);
      },
      (error) => {
        this.alert = "Email ou mot de passe invalide !";
        console.error('Login failed:', error);
        // Handle login error
      }
    );
    } else {
      this.alert = "Entrez votre email et votre mot de passe !"
    }
  }
}
