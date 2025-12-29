import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { map } from 'rxjs/operators';
import { FeatureFlagService } from './feature-flag.service';

export function featureFlagGuard(flagName: string, navigateToURL = '/not-found'): CanActivateFn {
  return () => {
    const featureFlags = inject(FeatureFlagService);
    const router = inject(Router);

    return featureFlags.isEnabled$(flagName).pipe(
      map(enabled => {
        console.log(`Feature flag "${flagName}" enabled: ${enabled}`);
        if (!enabled) {
          router.navigate([navigateToURL]);
          return false;
        }
        return true;
      })
    );
  };
}