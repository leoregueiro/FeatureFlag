import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FeatureFlagService } from '../feature-flag.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn implements OnInit {
  private featureFlags = inject(FeatureFlagService);
  private route = inject(Router);
  showConfirmationCode = signal(false);

  ngOnInit(): void {
    this.featureFlags.isEnabled$('EmailVerification')
      .subscribe(enabled => {
        this.showConfirmationCode.set(enabled);
      });
  }

  onLogin() {
    if (this.showConfirmationCode()) {
      this.route.navigate(['/confirm-code']);
    } else {
      this.route.navigate(['/dashboard']);
    }
  }
}
