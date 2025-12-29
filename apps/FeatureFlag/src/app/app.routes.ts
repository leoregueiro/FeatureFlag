import { Route } from '@angular/router';
import { SignIn } from '../sign-in/sign-in';
import { Dashboard } from '../dashboard/dashboard';
import { featureFlagGuard } from '../feature-flag.guard';

export const appRoutes: Route[] = [
  { path: 'login', component: SignIn },
  {
    path: 'confirm-code',
    loadComponent: () => import('../confirm-code/confirm-code.component').then(m => m.ConfirmCode),
    canActivate: [featureFlagGuard('EmailVerification')],
  },
  { path: 'dashboard', component: Dashboard },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: SignIn }
];
