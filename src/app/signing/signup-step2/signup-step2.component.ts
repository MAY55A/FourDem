import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { SigningComponent } from '../signing.component';

@Component({
  selector: 'app-signup-step2',
  templateUrl: './signup-step2.component.html',
  styleUrls: ['./signup-step2.component.css','../signing.component.css']
})
export class SignupStep2Component implements OnInit{
  constructor(private userService: UserService, private router: Router, private signup: SigningComponent) {}

  ngOnInit(): void {
    console.log(this.signup.newUser);
  }

  ChooseF() {
    this.signup.newUser.type = "Fournisseur";
    this.router.navigate(['compte/creation3']);
  }

  ChooseD() {
    this.signup.newUser.type = "Demandeur";
    this.userService.createUser(this.signup.newUser).subscribe(data => {
      this.router.navigate(['/compte/connexion']);
    });
  }

}
