// feature-flag.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay, tap } from 'rxjs/operators';

export interface FeatureFlags {
  [key: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {
  private flags$ = new BehaviorSubject<FeatureFlags>({});
  private loaded$ = new BehaviorSubject<boolean>(false);
  private loading$ = new BehaviorSubject<boolean>(false);
  private apiUrl = '/api/features';
  http = inject(HttpClient);

  constructor() {
    this.loadFlags()
  }

  // Load flags from server
  loadFlags(): void {
    this.loading$.next(true);
    this.http.get<FeatureFlags>(this.apiUrl).pipe(
      delay(100), // Simulate network delay
      tap(flags => {
        this.flags$.next(flags);
        this.loaded$.next(true);
        this.loading$.next(false);
      }),
      catchError(error => {
        console.error('Failed to load feature flags:', error);
        this.loaded$.next(true); // Mark as loaded even on error
        this.loading$.next(false);
        return of({});
      }),
      shareReplay(1)
    ).subscribe();
  }

  // Check if a feature is enabled
  isEnabled(featureName: string): boolean {
    return this.flags$.value[featureName] ?? false;
  }

  // Observable for a specific feature
  isEnabled$(featureName: string): Observable<boolean> {
    return this.flags$.pipe(
      map(flags => flags[featureName] ?? false)
    );
  }

  // Get all flags as observable
  getFlags$(): Observable<FeatureFlags> {
    return this.flags$.asObservable();
  }

  // Check if flags are loaded
  isLoaded(): boolean {
    return this.loaded$.value;
  }

  isLoaded$(): Observable<boolean> {
    return this.loaded$.asObservable();
  }

  isLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }
}