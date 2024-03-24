import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Notification } from 'src/app/_models/notification';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../profile/notifications/notifications.component.css']
})
export class HomeComponent implements OnInit{
  constructor(public notificationService: NotificationService, private router: Router, private sanitizer: DomSanitizer) {}
  
  notifications?: Notification[];

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationService.getAdminNotifications().subscribe(
      (notifs) => {
        this.notifications = notifs;
        console.log(notifs)
      }
    )
  }

  sanitizeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }

  markAsRead(notif: Notification) {
    notif.seen = true;
    this.notificationService.updateNotification(notif).subscribe(
      () => {
        console.log("Notification read !");
        this.getNotifications();
      }
    )
  }
  }
