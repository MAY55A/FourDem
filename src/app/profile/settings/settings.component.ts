import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SHA256, enc } from 'crypto-js';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  constructor(private app: AppComponent, private userService: UserService, private router: Router) { }
  user = {
    id: this.app.user!.id,
    name: this.app.user!.name,
    email: this.app.user!.email,
    description: this.app.user!.description,
    hash: this.app.user!.hash,
    contacts: this.app.user!.contacts,
    tel: this.app.user!.tel
  };
  alert?: string;
  success?: string;
  password1 = "";
  password2 = "";
  contacts?: string[];
  contact = "";

  ngOnInit(): void {
    console.log(this.app.user)
    this.contacts = this.user.contacts ? this.user.contacts.split(' ') : [];
    console.log(this.contacts)
  }

  deleteAccount() {
    if (confirm('Ce compte sera perdu infinitivement, vouler vous le supprimer ?')) {
      this.userService.deleteUser(this.app.user!.id!).subscribe(
        () => {
          console.log('User deleted successfully');
          this.router.navigate(["/compte/connexion"]).then(() => { location.reload(); })
        },
        (err) => console.log(err)
      );
    }
  }

  update() {
    this.alert = "";
    if (this.user.name != this.app.user?.name || this.user.email != this.app.user?.email || this.user.description != this.app.user?.description || this.user.tel != this.app.user.tel || this.contacts?.join(' ') != this.app.user.contacts || this.password1 || this.contact){
      if (!this.user.name || !this.user.email)
        this.alert = "Vous devez donner un nom et un email à votre profile !";
      else if (!this.user.email.includes("@") || this.user.email.includes(' '))
        this.alert = "Email non valide !";
      else if (this.user.email != this.app.user?.email)
        this.userExistes(this.user.email);
      if (!this.alert && this.password1){
          if (this.password1.length < 8)
            this.alert = "Le mot de passe doit contenir au moins 8 caractères !";
          else if (this.password1 != this.password2)
            this.alert = "Mot de passe de confirmation différent !";
          else if(SHA256(this.password1).toString(enc.Hex)==this.user.hash)
            this.alert = "Donner un nouveau mot de passe !";
          else
            this.user.hash = SHA256(this.password1).toString(enc.Hex);
      }
      if(!this.alert && this.user.tel) {
        if(!/^\d{2} \d{3} \d{3}$/.test(this.user.tel))
          this.alert = "Donner un numéro de téléphone suivant le format indiqué !";
      }
      if(!this.alert && this.contact) {
        if(this.user.contacts?.includes(this.contact))
          this.alert = "Donner un nouveau contact !";
        else if(this.contact.includes(" "))
          this.alert = "contact non valide !";
        else
          this.contacts?.push(this.contact);
      }
    } else
      this.alert = "Aucune modification !";
    if(!this.alert) {
      this.user.contacts = this.contacts?.join(' ').trim();
      this.userService.updateUser(this.user).subscribe(
        () => {
          console.log("updating account...");
          this.success = "Compte modifié !";
          window.location.reload();
        }
      )
    }
  }
  userExistes(email: string) {
    this.userService.readUserByEmail(email).subscribe(
      (user: User) => {
        if (user)
          this.alert = "Email déjà utilisé !";
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
