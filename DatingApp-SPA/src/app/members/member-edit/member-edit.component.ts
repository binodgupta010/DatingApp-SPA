import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

 @ViewChild('editForm') editForm = NgForm;

 user: User;

 @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    // if (this.editForm.dirty) {
    //   $event.returnValue = true;
    // }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private userService: UserService, private authService: AuthService) { }

ngOnInit() {
this.route.data.subscribe(data => {
 this.user = data['user'];

});
}
updateUser(editForm: NgForm) {
  this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
    this.alertify.success('Profile Succesfully updated');
     editForm.reset(this.user);
  }, error => {
    this.alertify.error(error);
  });
}

}
