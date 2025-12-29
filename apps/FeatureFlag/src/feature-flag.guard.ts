import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { map } from 'rxjs/operators';
import { FeatureFlagService } from './feature-flag.service';

export function featureFlagGuard(flagName: string): CanActivateFn {
  return () => {
    const featureFlags = inject(FeatureFlagService);
    const router = inject(Router);

    return featureFlags.isEnabled$(flagName).pipe(
      map(enabled => {
        if (!enabled) {
          router.createUrlTree(['/login']);
        }
        return true;
      })
    );
  };
}