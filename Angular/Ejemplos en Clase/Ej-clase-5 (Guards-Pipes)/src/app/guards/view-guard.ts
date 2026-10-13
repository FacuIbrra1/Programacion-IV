import { CanActivateChildFn } from '@angular/router';
import { Auth } from '../servicios/auth';
import { inject } from '@angular/core';

export const viewGuard: CanActivateChildFn = (childRoute, state) => {
  const auth = inject(Auth);
  const data = childRoute.data;
  debugger
  
  const currentUser = auth.getCurrentUser();

  if (currentUser && currentUser.view === data['view']) {
    return true;
  } else {
    return false;
  }

};
