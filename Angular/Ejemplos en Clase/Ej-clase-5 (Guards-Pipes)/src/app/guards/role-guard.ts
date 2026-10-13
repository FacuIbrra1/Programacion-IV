import { CanMatchFn } from '@angular/router';
import { Auth } from '../servicios/auth';
import { inject } from '@angular/core';

export const roleGuard: CanMatchFn = (route, segments) => {
  const auth = inject(Auth);
  const currentUser = auth.getCurrentUser();

  if (currentUser && currentUser.role === 'vendedor') {
    return true;
  } else {
    return false;
  }
  
};
