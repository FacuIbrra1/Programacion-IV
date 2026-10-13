import { CanDeactivateFn } from '@angular/router';
import { Iform } from '../models/IForm';

export const formGuard: CanDeactivateFn<Iform> = (
  component,
  currentRoute,
  currentState,
  nextState,
) => {
  if(component.noGuardado()) {
    return confirm('Tienes cambios sin guardar. ¿Deseas salir de todos modos?');
  }
  return true;
};
