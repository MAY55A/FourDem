import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { NotificationService } from 'src/app/_services/notification.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css', '../admin.component.css']
})
export class ComptesComponent implements OnInit{

  allUsers!: User[];
  users!: User[];
  type?: string;
  domain?: string;
  searchValue = '';
  icon = "fa fa-search";

  constructor(private userService: UserService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadUsers();
    
  }

  loadUsers() {
    this.userService.readUsers().subscribe(
      (data) => {
        this.allUsers = data;
        this.filterType();
      }
    )
  }

  filterType() {
    if(this.type)
      this.users = this.allUsers.filter(u => u.type == this.type)
    else
      this.users = this.allUsers;
  }

  filterDomain() {
    if(this.domain)
      this.users = this.allUsers.filter(u => u.domain == this.domain)
    else
      this.filterType();
  }
  search() {
    if(this.searchValue)
      if(this.icon == "fa fa-search") {
        this.users = this.allUsers.filter(u => u.id!.toString().includes(this.searchValue) || u.name.toLowerCase().includes(this.searchValue) || u.email.toLowerCase().includes(this.searchValue))
        this.icon = "fa fa-arrow-left";
      } else {
        this.searchValue = '';
        this.users = this.allUsers;
        this.icon = "fa fa-search";
    }
  }
  warnAccount(id: number) {
    if (confirm("Avertir le compte d'utilisateur n°" + id + " ?")) {
      const notification = {
        type: "warning",
        content: "La'administrateur du site vous a envoyé un avertissement. Si vous ne respectez pas les lois du site, votre compte sera supprimé !",
        userId: id
      }
      this.notificationService.createNotification(notification).subscribe(
        () => {
          console.log('Warning successfully sent !');
        },
        (err) => console.log(err)
      );
    }
  }

  deleteAccount(id: number) {
    if (confirm("Supprimer le compte d'utilisateur n°" + id + " ?")) {
      this.userService.deleteUser(id).subscribe(
        () => {
          console.log('User deleted successfully');
          this.loadUsers();
        },
        (err) => console.log(err)
      );
    }
  }


}
