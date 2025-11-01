import {Routes} from '@angular/router';


export const authRoutes:Routes=[
    {path:'',redirectTo:'/auth/register',pathMatch:'full'},
    {path:'auth',children:
        [
            {   
                path:'register',
                loadComponent:()=>import('../auth/signup/signup').then(m=>m.Signup)
            },
            {   
                path:'login',
                loadComponent:()=>import('../auth/login/login').then(m=>m.Login)
            } 
    ]
    }
]