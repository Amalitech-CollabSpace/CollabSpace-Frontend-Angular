import { Component,OnInit, inject,ViewChild,OnDestroy} from '@angular/core';
import {RouterLink,Router} from "@angular/router";
import {ReactiveFormsModule,FormControl,FormGroup,Validators} from "@angular/forms";

import {InputComponent} from '../../../components/input-component/input-component';
import {AuthServices} from '../../../core/services/authService/auth-service';
import {Subject, takeUntil} from 'rxjs'

import {StrongPasswordValidator} from '../validators/passwordRegex';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private router=inject(Router);
    private authService=inject(AuthServices)
    private _destroy$=new Subject<void>();
  
    public errorMessage='';
    
  
    
  
    loginForm!:FormGroup<{email:FormControl<string|null>,password:FormControl<string|null>}>;
  
  
    ngOnInit(){
      this.loginForm=new FormGroup({
        email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        password:new FormControl('',[Validators.required,Validators.minLength(8),StrongPasswordValidator()]),
      });
    }
  
    
  
    public submitLogin(){
      
      if(this.loginForm.valid){
        const newUser={
          password:this.loginForm.controls.password.value || '',
          email:this.loginForm.controls.email.value||'',
        }
        this.authService.login(newUser)
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
        this.loginForm.markAllAsTouched();
    }
  }
  
  
  ngOnDestroy(){
      this._destroy$.next();
      this._destroy$.complete();
    }
  
    

}
