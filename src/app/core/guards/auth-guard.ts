import { CanActivateFn,Router } from '@angular/router';
import {AuthServices} from '../services/authService/auth-service'
import {inject} from '@angular/core'

export const authGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthServices);
  const router=inject(Router);


  if(authService.isLoggedIn()){
    return true
  }

  return router.createUrlTree(['/auth/login'],{queryParams:{returnUrl:state.url}})
};
