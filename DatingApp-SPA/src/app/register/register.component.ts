import { Component, OnInit, Input , Output , EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 @Input()  valueFromHome: any;
 @Output()  cancelRegister = new EventEmitter();
 registerForm: FormGroup;
 model: any = {};

  constructor(private authService: AuthService , private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      userName: new FormControl('' , Validators.required),
      password: new FormControl('' , [Validators.required , Validators.minLength(4),
      Validators.maxLength(8)]),
      confirmPassword: new FormControl('' , Validators.required)
    }, this.passwordMatchValidator);
  }

  passwordMatchValidator(fg: FormGroup) {
   return fg.get('password').value === fg.get('confirmPassword').value ? null : { 'mismatch' : true};
  }
  register() {
    // this.authService.register(this.model).subscribe(
    //   () => {
    //     this.alertifyService.success('register successfully');
    //     console.log('register successfully');
    //   }, error => {
    //     this.alertifyService.error('register failed');
    //     console.log('register failed');
    //   }
    // );
    //  console.log(this.model);
    console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancel');
  }
}
