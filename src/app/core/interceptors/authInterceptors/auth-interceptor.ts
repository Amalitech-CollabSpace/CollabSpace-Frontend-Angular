import { HttpInterceptorFn,HttpRequest,HttpHandlerFn,HttpErrorResponse} from '@angular/common/http';
import {catchError,Observable,of,throwError,switchMap} from 'rxjs';
import {runInInjectionContext,inject} from '@angular/core'
import {AuthServices} from '../../services/authService/auth-service'
import {Router} from '@angular/router'

let errCount=0


function handleError(req:HttpRequest<any>,next:HttpHandlerFn,err:HttpErrorResponse,authService:AuthServices,router:Router):Observable<any>{

  if(err&&err.status===401 && errCount !=1){
    errCount++
    return authService.getRefreshToken().pipe(
      switchMap((x:any)=>{
        localStorage.setItem('user_token',x.token)
        const retryRequest=req.clone(
          {
            setHeaders:{Authorization:`Bearer ${x.token}`}
          })

          return next(retryRequest);
      }),
      catchError((errs)=>{
        authService.logout();
        router.navigate(['/auth/login'])
        return throwError(()=>new Error(errs.message ||'Refresh Token failed'))

      }))
  }else{
    errCount=0
      const retryRequest=req.clone(
          {
            setHeaders:{Authorization:`Bearer ${localStorage.getItem('user_token')}`}
          })
          return next(retryRequest);
    // return throwError(()=>new Error("Non Authentication Error"))
  }
  
  }

export const AuthInterceptor: HttpInterceptorFn = (req:HttpRequest<unknown>, next:HttpHandlerFn) => {
  const token=localStorage.getItem('user_token')
  const router=inject(Router)
  const authService=inject(AuthServices)




  const newRequest=req.clone({
    setHeaders:{
      Authorization:`Bearer ${token}`
    }
  })
  return next(newRequest).pipe(
    catchError(err=>handleError(req,next,err as HttpErrorResponse,authService,router))
  )

  
};


