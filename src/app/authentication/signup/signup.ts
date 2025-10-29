import { Component,OnInit} from '@angular/core';
import {FormGroup,ReactiveFormsModule,FormControl} from '@angular/forms'
import SignedUpUserInterface from '../user-interface';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup implements OnInit{

  public signedUpUser!:FormGroup

  ngOnInit(){
    
    this.signedUpUser=new FormGroup({
      firstName:new FormControl(''),
      lastName:new FormControl(''),
      email:new FormControl(''),
      password:new FormControl(''),
      confirmPassword:new FormControl(''),
    })

  }


}
