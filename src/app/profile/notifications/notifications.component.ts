import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/_models/notification';
import { NotificationService } from 'src/app/_services/notification.service';
import { ProfileService } from 'src/app/_services/profile.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{

  constructor(private profileService: ProfileService, public notificationService: NotificationService) {}
  notifications!: Notification[];

  ngOnInit(): void {
    this.profileService.user$.subscribe((user) => {
      this.LoadNotifications(user!.id!);
    });
  }

  LoadNotifications(id: number) {
    this.notificationService.getNotificationsByUser(id).subscribe(
        (notifications) => {
        this.notifications = notifications;
        console.log(notifications);
      }
    )
  }

  markAsRead(notif: Notification) {
    notif.seen = true;
    this.notificationService.updateNotification(notif).subscribe(
      () => {
        console.log("Notification read !");
        this.ngOnInit();
      }
    )
  }
}
