import { 
  Directive, 
  Input, 
  TemplateRef, 
  ViewContainerRef, 
  OnInit,
  OnDestroy,
  inject
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FeatureFlagService } from './feature-flag.service';

@Directive({
  selector: '[appFeatureFlag]',
  standalone: true
})
export class FeatureFlagDirective implements OnInit, OnDestroy {
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private featureFlagService = inject(FeatureFlagService);
  private destroy$ = new Subject<void>();

  @Input({required: true}) appFeatureFlag!: string;

  ngOnInit(): void {
    this.featureFlagService
      .isEnabled$(this.appFeatureFlag)
      .pipe(takeUntil(this.destroy$))
      .subscribe(enabled => {
        this.viewContainer.clear();
        
        if (enabled) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}