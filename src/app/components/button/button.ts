import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (routerLink()) {
      <a
        [routerLink]="routerLink()"
        [class]="getButtonClasses()">
        <ng-content></ng-content>
        @if (label()) {
          {{ label() }}
        }
      </a>
    } @else {
      <button
        [type]="type()"
        [disabled]="disabled()"
        [class]="getButtonClasses()"
        (click)="handleClick()">
        <ng-content></ng-content>
        @if (label()) {
          {{ label() }}
        }
      </button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  label = input<string>('');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  variant = input<'primary' | 'secondary' | 'danger'>('primary');
  routerLink = input<string>('');


  clicked = output<void>();

  getButtonClasses(): string {
    const baseClasses =
      'px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    
    switch (this.variant()) {
      case 'primary':
        return `${baseClasses} bg-blue-500 text-white hover:bg-blue-600`;
      case 'secondary':
        return `${baseClasses} bg-gray-200 text-gray-700 hover:bg-gray-300`;
      case 'danger':
        return `${baseClasses} bg-red-600 text-white hover:bg-red-700`;
      default:
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
    }
  }

  handleClick(): void {
    if (!this.disabled() && !this.routerLink()) {
      this.clicked.emit();
    }
  }
}
