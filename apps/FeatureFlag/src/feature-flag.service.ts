import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';

export interface FeatureFlags {
  [key: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {
  private http = inject(HttpClient);
  private flags$ = new BehaviorSubject<FeatureFlags>({});
  private apiUrl = '/api/features';
  loading$ = signal(false);

  constructor() {
    this.loadFlags();
  }

  loadFlags(): void {
    this.loading$.set(true);
    this.http.get<FeatureFlags>(this.apiUrl)
      .pipe(
        delay(500), // Simulate network delay
        tap(flags => this.flags$.next(flags)),
        finalize(() => this.loading$.set(false))
      )
      .subscribe();
  }

  isEnabled$(flagName: string): Observable<boolean> {
    return new Observable(observer => {
      this.flags$.subscribe(flags => {
        observer.next(flags[flagName] || false);
      });
    });
  }

  isEnabledSync(flagName: string): boolean {
    return this.flags$.value[flagName] || false;
  }

  getFlags$(): Observable<FeatureFlags> {
    return this.flags$.asObservable();
  }
}