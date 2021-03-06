import { Component, OnInit, Input , Output , EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 @Input()  valueFromHome: any;
 @Output()  cancelRegister = new EventEmitter();
 registerForm: FormGroup;
 user: User;
 bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService ,
    private alertifyService: AlertifyService ,
    private fb: FormBuilder , private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
   // this.createRegisterForm();
    this.registerForm = new FormGroup({
      gender: new FormControl('male'),
      userName: new FormControl('' , Validators.required),
      knownAs:  new FormControl('' , Validators.required),
      dateOfBirth: new FormControl(null , Validators.required),
      city:  new FormControl('' , Validators.required),
      country: new FormControl('' , Validators.required),
      password: new FormControl('' , [Validators.required , Validators.minLength(4),
      Validators.maxLength(8)]),
      confirmPassword: new FormControl('' , Validators.required)
    }, this.passwordMatchValidator);
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
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);

      this.authService.register(this.user).subscribe(() => {
        this.alertifyService.success('register successfully');
        console.log('register successfully');
      }, error => {
        this.alertifyService.error('register failed');
        console.log('register failed');
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/member']);
        });
      }
    );
    }

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
