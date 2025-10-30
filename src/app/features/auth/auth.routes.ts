import {Routes} from '@angular/router';

export const routes:Routes=[
    {path:'',redirectTo:'register',pathMatch:'full'},
    {   
        path:'register',
        loadComponent:()=>import('./signup/signup').then(m=>m.Signup)
    }    
]