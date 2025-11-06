import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ExportReportRequest {
  format: 'CSV' | 'PDF';
  filterId?: string;
  startDate?: string;
  endDate?: string;
}

export interface ExportReportResponse {
  downloadUrl: string;
  filename: string;
  message: string;
  generatedAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private baseUrl = import.meta.env.NG_APP_API_GATEWAY;
  private http = inject(HttpClient);

  exportReport(
    format: 'CSV' | 'PDF',
    filters?: { filterId?: string; startDate?: string; endDate?: string }
  ): Observable<ExportReportResponse> {
    const requestBody: ExportReportRequest = {
      format,
      ...(filters?.filterId && { filterId: filters.filterId }),
      ...(filters?.startDate && { startDate: filters.startDate }),
      ...(filters?.endDate && { endDate: filters.endDate }),
    };

    return this.http
      .post<ExportReportResponse>(`${this.baseUrl}/analytics/reports/export`, requestBody)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}

