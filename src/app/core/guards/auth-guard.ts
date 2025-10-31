import { CanActivateFn } from '@angular/router';
import {AuthServices} from '../services/authService/auth-service'
import {inject} from '@angular/core'

export const authGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthServices)

  if(authService.isLoggedIn()){
    return true
  }

  return false;
};
