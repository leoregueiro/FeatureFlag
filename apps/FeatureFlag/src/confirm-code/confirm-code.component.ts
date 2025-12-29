import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-code',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-code.html',
  styleUrl: './confirm-code.scss',
})
export class ConfirmCode {
  private route = inject(Router);

  confirm() {
    this.route.navigate(['/dashboard']);
  }
}
