import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FeatureFlagService } from '../feature-flag.service';
import { FeatureFlagDirective } from '../feature-flag.directive';

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
  busy$ = this.featureFlags.loading$;

  refreshFlags() {
    this.featureFlags.loadFlags();
  }
}
