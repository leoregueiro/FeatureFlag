import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { FeatureFlagService } from './feature-flag.service';

export function featureFlagGuard(flagName: string, navigateToURL = '/not-found'): CanActivateFn {
  return () => {
    const featureFlags = inject(FeatureFlagService);
    const router = inject(Router);

    return featureFlags.isLoaded$().pipe(
      filter(loaded => loaded === true), // Wait until loaded
      take(1), // Complete after first emission
      switchMap(() => featureFlags.isEnabled$(flagName)),
      take(1),
      map(isEnabled => {
        if (isEnabled) {
          return true;
        }
        return router.createUrlTree([navigateToURL]);
      })
    );
  };
}