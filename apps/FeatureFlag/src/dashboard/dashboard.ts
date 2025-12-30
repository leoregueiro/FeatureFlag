import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FeatureFlagService } from '../feature-flag.service';
import { FeatureFlagDirective } from '../feature-flag.directive';
import { delay, map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FeatureFlagDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private featureFlags = inject(FeatureFlagService);
  featureList$ = this.featureFlags.getFlags$();
  isLoading$ = this.featureFlags.isLoading$();

  refreshFlags() {
    this.featureFlags.loadFlags();
  }
}
