import { Component,Input} from '@angular/core';
import {FormControl,ReactiveFormsModule} from '@angular/forms'
import {KeyValuePipe} from '@angular/common';

@Component({
  selector: 'app-input-component',
  imports: [ReactiveFormsModule,KeyValuePipe],
  templateUrl: './input-component.html',
  styleUrl: './input-component.scss',
})
export class InputComponent {
  @Input() controlName = new FormControl('');
  @Input() label:string='';
  @Input() type:string=''

  

}
