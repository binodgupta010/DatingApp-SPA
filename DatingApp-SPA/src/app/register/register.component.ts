import { Component, OnInit, Input , Output , EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 @Input()  valueFromHome: any;
 @Output()  cancelRegister = new EventEmitter();

 model: any = {};

  constructor(private authService: AuthService , private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertifyService.success('register successfully');
        console.log('register successfully');
      }, error => {
        this.alertifyService.error('register failed');
        console.log('register failed');
      }
    );

     console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancel');
  }
}
