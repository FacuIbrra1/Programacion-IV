import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../servicios/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const auth = inject(Auth);
  const currentUser = auth.getCurrentUser();

  if (currentUser) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
  
};
