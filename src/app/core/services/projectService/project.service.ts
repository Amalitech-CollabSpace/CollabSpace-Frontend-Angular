import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Project, ProjectRequest } from '../../../models/project.model';
import { environment } from '../../../../environments/environment.development';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getProjects(memberId?: string): Observable<Project[]> {
    let url = `${this.baseUrl}/projects`;
    
    if (memberId) {
      url += `?memberId=${memberId}`;
    }

    return this.http.get<Project[]>(url).pipe(
      catchError((error) => {
        toast.error('Failed to fetch projects', {
          description: error?.error?.message || 'An error occurred while loading projects.'
        });
        return throwError(() => error);
      })
    );
  }

  public getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/projects/${id}`).pipe(
      catchError((error) => {
        toast.error('Failed to fetch project', {
          description: error?.error?.message || 'An error occurred while loading the project.'
        });
        return throwError(() => error);
      })
    );
  }

  public createProject(project: ProjectRequest, userId: string): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/projects`, {
      ...project,
      createdBy: userId
    }).pipe(
      catchError((error) => {
        toast.error('Failed to create project', {
          description: error?.error?.message || 'An error occurred while creating the project.'
        });
        return throwError(() => error);
      })
    );
  }

  public updateProject(id: string, project: ProjectRequest, userId: string): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/projects/${id}`, {
      ...project,
      createdBy: userId
    }).pipe(
      catchError((error) => {
        toast.error('Failed to update project', {
          description: error?.error?.message || 'An error occurred while updating the project.'
        });
        return throwError(() => error);
      })
    );
  }
}
