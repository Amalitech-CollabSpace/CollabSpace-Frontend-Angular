import { HttpInterceptorFn,HttpRequest,HttpHandlerFn,HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthServices } from "../../services/authService/auth-service";
import { BehaviorSubject,throwError,Observable,of } from "rxjs";
import { catchError,filter,switchMap,take,shareReplay,finalize } from "rxjs/operators";


let refreshTokenInProgress=false;
const refreshTokenSubject=new BehaviorSubject<string|null>(null)


export const AuthInterceptor:HttpInterceptorFn=(req:HttpRequest<unknown>,next:HttpHandlerFn)=>{
  const authService=inject(AuthServices)
  const router=inject(Router)


  const token=localStorage.getItem('user_token');
  const authReq=token? req.clone({ setHeaders:{Authorization:`Bearer ${token} `}}):req;

  return next(authReq).pipe(
    catchError((error:HttpErrorResponse)=>{
      if(error.status===401){
        return handle401Error(authReq,next,authService,router)
      }
      return throwError(()=>error);
    })
  )
};

function handle401Error( req:HttpRequest<any>,next:HttpHandlerFn,authService:AuthServices,router:Router):Observable<any>{
    if(!refreshTokenInProgress){
      refreshTokenInProgress=true;
      refreshTokenSubject.next(null)
    

    const refresh$=authService.getRefreshToken().pipe(
      shareReplay(1),
      switchMap((res:any)=>{
        const newToken=res.token;
        if(!newToken){
          throw new Error('No token returned from refresh endpoint')
        }
        localStorage.setItem('user_token',newToken)
        refreshTokenSubject.next(newToken);

        const retryReq=req.clone({
          setHeaders:{ Authorization:`Bearer ${newToken}`}
        })
        return next(retryReq)
      }),

      catchError((err)=>{
        authService.logout();
        router.navigateByUrl('/auth/login');
        return throwError(()=>err);
      }),
      finalize(()=>{
        refreshTokenInProgress=false;
      })
    )
    return refresh$
}else{
  return refreshTokenSubject.pipe(
    filter((token)=>token!=null),
    take(1),
    switchMap((token)=>{
      const retryReq=req.clone({
        setHeaders:{Authorization:`Bearer ${token}`}
      });
      return next(retryReq);
    }),
    catchError((err)=>throwError(()=>err))
  )


  }
}