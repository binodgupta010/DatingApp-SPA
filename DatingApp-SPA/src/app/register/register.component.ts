import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 @Input()  valueFromHome: any;
  model1: any;

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log(this.model1);
  }

  cancel() {
    console.log('cancel');
  }
}
