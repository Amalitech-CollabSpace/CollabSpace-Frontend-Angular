import {Routes} from '@angular/router';


export const routes:Routes=[
    {path:'',redirectTo:'/auth/register',pathMatch:'full'},
    {path:'auth',children:
        [
            {   
                path:'register',
                loadComponent:()=>import('../auth/signup/signup').then(m=>m.Signup)
            }    
    ]
    }
]