import { Component,Input} from '@angular/core';
import {FormControl,ReactiveFormsModule} from '@angular/forms'
import { KeyValuePipe, NgClass } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsers,heroEye,heroEyeSlash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-input-component',
  imports: [ReactiveFormsModule, KeyValuePipe,NgIcon],
  templateUrl: './input-component.html',
  styleUrl: './input-component.scss',
  viewProviders: [provideIcons({  heroUsers,heroEye,heroEyeSlash })]
})
export class InputComponent {
  @Input() controlName = new FormControl('');
  @Input() label:string='';
  @Input() type:string='';

  showPassword:boolean=true


  public errorMessages:Record<string, string>={
    required: 'This field is required',
    pattern:'Please enter a valid email',
    passwordNotStrong:'Passwords must include upper & lower case, number & symbol',
    minlength:'Please enter a password of length 8 or more'
    
  
  }

  togglePasswordVisibility():void{
    this.showPassword=!this.showPassword;

  }
  
  

}
