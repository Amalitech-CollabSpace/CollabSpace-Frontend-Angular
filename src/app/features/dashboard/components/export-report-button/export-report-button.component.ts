import { Component, signal, inject, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { 
  heroArrowDownTray, 
  heroChevronDown,
  heroDocumentText,
  heroDocumentArrowDown
} from '@ng-icons/heroicons/outline';
import { AnalyticsService } from '../../../../core/services/analyticsService/analytics.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-export-report-button',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './export-report-button.component.html',
  styleUrl: './export-report-button.component.scss',
  viewProviders: provideIcons({ 
    heroArrowDownTray, 
    heroChevronDown,
    heroDocumentText,
    heroDocumentArrowDown
  }),
})
export class ExportReportButtonComponent {
  private readonly analyticsService = inject(AnalyticsService);
  private readonly elementRef = inject(ElementRef);
  private readonly baseUrl = import.meta.env.NG_APP_API_GATEWAY;
  
  protected readonly isDropdownOpen = signal(false);
  protected readonly isLoading = signal(false);

  toggleDropdown(): void {
    this.isDropdownOpen.update(value => !value);
  }

  closeDropdown(): void {
    this.isDropdownOpen.set(false);
  }

  exportReport(format: 'csv' | 'pdf'): void {
    this.isLoading.set(true);
    this.closeDropdown();

    this.analyticsService.exportReport(format).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        const downloadUrl = `${this.baseUrl}${response.downloadUrl}`;
        window.open(downloadUrl, '_blank');
        toast.success('Report exported successfully', {
          description: `Your ${format.toUpperCase()} report is being downloaded.`
        });
      },
      error: (error) => {
        this.isLoading.set(false);
        toast.error('Failed to export report', {
          description: error?.error?.message || error?.message || 'An error occurred while exporting the report.'
        });
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }
}
