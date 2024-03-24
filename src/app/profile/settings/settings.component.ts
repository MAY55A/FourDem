import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SHA256, enc } from 'crypto-js';
import { User } from 'src/app/_models/user';
import { ProfileService } from 'src/app/_services/profile.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  constructor(private userService: UserService, private router: Router, private profileService: ProfileService) { }
  currentUser!: User;
  user!: User;
  alert?: string;
  success?: string;
  password1 = "";
  password2 = "";
  contacts?: string[];
  contact = "";

  ngOnInit(): void {
    this.profileService.user$.subscribe((user) => {
      this.currentUser = user!;
      this.user = {...this.currentUser};
      this.contacts = this.user.contacts ? this.user.contacts.split(' ') : [];
      this.getHash(this.user.email!);
    });

  }

  deleteAccount() {
    if (confirm('Ce compte sera perdu infinitivement, vouler vous le supprimer ?')) {
      this.userService.deleteUser(this.user!.id!).subscribe(
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
    if (this.user.name != this.currentUser.name || this.user.email != this.currentUser.email || this.user.description != this.currentUser.description || this.user.tel != this.currentUser.tel || this.contacts?.join(' ') != this.currentUser.contacts || this.password1 || this.contact){
      if (!this.user.name || !this.user.email)
        this.alert = "Vous devez donner un nom et un email à votre profile !";
      else if (!this.user.email.includes("@") || this.user.email.includes(' '))
        this.alert = "Email non valide !";
      else if (this.user.email != this.currentUser.email)
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
      this.user.contacts = this.contacts?.filter(c => c != "").join(' ').trim();
      this.userService.updateUser(this.user).subscribe(
        () => {
          console.log("updating account...");
          this.success = "Compte modifié !";
          setTimeout(() => {
            window.location.reload();
          }, 1000);
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

  getHash(email: string) {
    this.userService.getHash(email).subscribe(
      (user: User) => {
        this.user.hash = user.hash;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
