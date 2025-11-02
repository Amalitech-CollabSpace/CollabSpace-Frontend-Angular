import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project, ProjectRequest } from '../../../models/project.model';
import { ProjectMember, ProjectMemberRequest } from '../../../models/project-member.model';
import { Team, TeamRequest } from '../../../models/team.model';
import { environment } from '../../../../environments/environment.development';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = environment.apiUrl;
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/projects`, { headers: this.headers })
      .pipe(catchError((error) => this.handleError(error, 'Failed to load projects')));
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/projects/${id}`, { headers: this.headers })
      .pipe(catchError((error) => this.handleError(error, 'Failed to load project')));
  }

  createProject(project: ProjectRequest, userId: string): Observable<Project> {
    const headers = this.headers.set('X-User-Id', userId);
    return this.http.post<Project>(`${this.baseUrl}/projects`, project, { headers })
      .pipe(catchError((error) => this.handleError(error, 'Failed to create project')));
  }

  updateProject(id: string, project: ProjectRequest, userId: string): Observable<Project> {
    const headers = this.headers.set('X-User-Id', userId);
    return this.http.put<Project>(`${this.baseUrl}/projects/${id}`, project, { headers })
      .pipe(catchError((error) => this.handleError(error, 'Failed to update project')));
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/projects/${id}`, { headers: this.headers })
      .pipe(catchError((error) => this.handleError(error, 'Failed to delete project')));
  }

  getProjectMembers(projectId: string): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`${this.baseUrl}/project_members?projectId=${projectId}`, { headers: this.headers })
      .pipe(catchError((error) => this.handleError(error, 'Failed to load project members')));
  }

  addMember(projectId: string, memberId: string, role?: string): Observable<ProjectMember> {
    const memberRequest: ProjectMemberRequest = {
      projectId,
      userId: memberId,
      role: role as any
    };
    return this.http.post<ProjectMember>(`${this.baseUrl}/project_members`, memberRequest, { headers: this.headers })
      .pipe(catchError((error) => this.handleError(error, 'Failed to add member')));
  }

  removeMember(projectId: string, memberId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/project_members/${projectId}/${memberId}`, { headers: this.headers })
      .pipe(catchError((error) => this.handleError(error, 'Failed to remove member')));
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/teams`, { headers: this.headers })
      .pipe(catchError((error) => this.handleError(error, 'Failed to load teams')));
  }

  getTeamById(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/teams/${id}`, { headers: this.headers })
      .pipe(catchError((error) => this.handleError(error, 'Failed to load team')));
  }

  createTeam(team: TeamRequest): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/teams`, team, { headers: this.headers })
      .pipe(catchError((error) => this.handleError(error, 'Failed to create team')));
  }

  updateTeam(id: string, team: TeamRequest): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/teams/${id}`, team, { headers: this.headers })
      .pipe(catchError((error) => this.handleError(error, 'Failed to update team')));
  }

  deleteTeam(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/teams/${id}`, { headers: this.headers })
      .pipe(catchError((error) => this.handleError(error, 'Failed to delete team')));
  }

  private handleError(error: HttpErrorResponse, defaultMessage: string): Observable<never> {
    let errorMessage = defaultMessage;
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `${defaultMessage}: ${error.error.message}`;
    } else {
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.message) {
        errorMessage = `${defaultMessage}: ${error.message}`;
      }
    }
    
    toast.error(defaultMessage, {
      description: error.error?.message || error.message || 'An error occurred'
    });
    
    return throwError(() => new Error(errorMessage));
  }
}
