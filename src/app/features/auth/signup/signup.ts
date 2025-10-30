import { Component,OnInit, inject,ViewChild,OnDestroy} from '@angular/core';
import {RouterLink,Router} from "@angular/router";
import {ReactiveFormsModule,FormControl,FormGroup,Validators} from "@angular/forms";
import {confirmPasswordValidator} from '../validators/confirmPassword';
import {InputComponent} from '../input-component/input-component';
import {AuthServices} from '../../../core/services/authService/auth-service';
import {Subject, takeUntil} from 'rxjs'



@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './signup.html',
  // styleUrl: '',
})
export class Signup implements OnInit,OnDestroy {
  private router=inject(Router);
  private authService=inject(AuthServices)
  private _destroy$=new Subject<void>();

  public errorMessage='';
  

  

  signUpForm!:FormGroup<{fullName:FormControl<string|null>,email:FormControl<string|null>,password:FormControl<string|null>,confirmPassword:FormControl<string|null>}>;


  ngOnInit(){
    this.signUpForm=new FormGroup({
      fullName:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password:new FormControl('',[Validators.required]),
      confirmPassword:new FormControl('',[Validators.required]),

    },{validators:confirmPasswordValidator});
  }

  

  public submitSignup(){
    
    if(this.signUpForm.valid){
      const newUser={
        fullName:this.signUpForm.controls.fullName.value || '',
        password:this.signUpForm.controls.password.value || '',
        email:this.signUpForm.controls.email.value||'',
      }
      this.authService.signup(newUser)
      .subscribe({
        next:()=> {
          this.router.navigate(['/dashboard'])
          
          takeUntil(this._destroy$)
        },
        error:(err)=>{
          this.errorMessage=err?.error?.error||err?.message||'Unknown error'
          
        },
})
      
      
  }else{
      this.signUpForm.markAllAsTouched();
  }
}


ngOnDestroy(){
    this._destroy$.next();
    this._destroy$.complete();
  }

  
   


}
