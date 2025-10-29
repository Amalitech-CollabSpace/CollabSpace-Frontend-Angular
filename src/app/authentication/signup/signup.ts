import { Component,OnInit} from '@angular/core';
import {FormGroup,ReactiveFormsModule,FormControl} from '@angular/forms'
import SignedUpUserInterface from '../user-interface';
import {InputComponent} from '../input-component/input-component'

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,InputComponent],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup implements OnInit{

    signUpForm!:FormGroup<{firstName:FormControl<string|null>,lastName:FormControl<string|null>,email:FormControl<string|null>,password:FormControl<string|null>,confirmPassword:FormControl<string|null>}>;


  ngOnInit(){

    this.signUpForm=new FormGroup({
      firstName:new FormControl(''),
      lastName:new FormControl(''),
      email:new FormControl(''),
      password:new FormControl(''),
      confirmPassword:new FormControl(''),
    })

  }


}
