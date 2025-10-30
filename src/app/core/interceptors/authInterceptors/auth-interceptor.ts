import { HttpInterceptorFn,HttpRequest,HttpHandlerFn} from '@angular/common/http';



export const AuthInterceptor: HttpInterceptorFn = (req:HttpRequest<unknown>, next:HttpHandlerFn) => {
  const token=localStorage.getItem('user_token')

  const newRequest=req.clone({
    setHeaders:{
      Authorization:`Bearer ${token}`
    }
  })
  return next(newRequest)
};
