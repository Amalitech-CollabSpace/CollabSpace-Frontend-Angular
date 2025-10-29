import {Routes} from '@angular/router';


export const authRoutes:Routes=[
    {path:'',redirectTo:'/auth/register',pathMatch:'full'},
    {path:'auth',children:
        [
            {   
                path:'register',
                loadComponent:()=>import('../authentication/signup/signup').then(m=>m.Signup)
            }    
    ]
    }
]