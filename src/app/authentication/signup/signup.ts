import { Component,OnInit} from '@angular/core';
import {FormGroup,ReactiveFormsModule,FormControl,Validators} from '@angular/forms'
import SignedUpUserInterface from '../user-interface';
import {InputComponent} from '../input-component/input-component'
import {confirmPasswordValidator} from '../validators/confirmPassword';


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,InputComponent],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup implements OnInit{

    signUpForm!:FormGroup<{fullName:FormControl<string|null>,lastName:FormControl<string|null>,email:FormControl<string|null>,password:FormControl<string|null>,confirmPassword:FormControl<string|null>}>;


  ngOnInit(){

    this.signUpForm=new FormGroup({
      fullName:new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password:new FormControl('',[Validators.required]),
      confirmPassword:new FormControl('',[Validators.required]),
    },{validators:confirmPasswordValidator});
  }


}
