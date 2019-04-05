import { Component, OnInit, Input , Output , EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


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

  constructor(private authService: AuthService , private alertifyService: AlertifyService , private fb: FormBuilder) { }

  ngOnInit() {
   this.createRegisterForm();
    // this.registerForm = new FormGroup({
    //   // gender: new FormControl('male'),
    //   userName: new FormControl('' , Validators.required),
    //   password: new FormControl('' , [Validators.required , Validators.minLength(4),
    //   Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('' , Validators.required)
    // }, this.passwordMatchValidator);
   }

  createRegisterForm() {
    this.registerForm = this.fb.group({
     // gender: ['male'],
      username: ['', [Validators.required, Validators.minLength(4)]],
      // knownAs: ['', [Validators.required]],
      // dateOfBirth: [null, [Validators.required]],
      // city: ['', [Validators.required]],
      // country: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmpassword: ['', Validators.required]
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
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
