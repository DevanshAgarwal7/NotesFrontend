import { CanActivateFn } from '@angular/router';
import { getLoggedInStatus } from 'src/model/logged-in';

export const authGuard: CanActivateFn = (_route, _state) => {
  return getLoggedInStatus();
};
