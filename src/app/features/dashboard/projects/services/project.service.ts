import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project, ProjectRequest } from '../../../../models/project.model';
import { ProjectMember, ProjectMemberRequest } from '../../../../models/project-member.model';
import { Team, TeamRequest } from '../../../../models/team.model';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = environment.apiUrl;
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  /**
   * Get all projects
   */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/projects`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get project by ID
   */
  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/projects/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Create a new project
   */
  createProject(project: ProjectRequest, userId: string): Observable<Project> {
    const headers = this.headers.set('X-User-Id', userId);
    return this.http.post<Project>(`${this.baseUrl}/projects`, project, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Update an existing project
   */
  updateProject(id: string, project: ProjectRequest, userId: string): Observable<Project> {
    const headers = this.headers.set('X-User-Id', userId);
    return this.http.put<Project>(`${this.baseUrl}/projects/${id}`, project, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete a project
   */
  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/projects/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get all members of a project
   */
  getProjectMembers(projectId: string): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`${this.baseUrl}/project_members?projectId=${projectId}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Add a member to a project
   */
  addMember(projectId: string, memberId: string, role?: string): Observable<ProjectMember> {
    const memberRequest: ProjectMemberRequest = {
      projectId,
      userId: memberId,
      role: role as any
    };
    return this.http.post<ProjectMember>(`${this.baseUrl}/project_members`, memberRequest, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Remove a member from a project
   */
  removeMember(projectId: string, memberId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/project_members/${projectId}/${memberId}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get all teams
   */
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/teams`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get team by ID
   */
  getTeamById(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/teams/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Create a new team
   */
  createTeam(team: TeamRequest): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/teams`, team, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Update an existing team
   */
  updateTeam(id: string, team: TeamRequest): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/teams/${id}`, team, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete a team
   */
  deleteTeam(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/teams/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }
    
    console.error('ProjectService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
