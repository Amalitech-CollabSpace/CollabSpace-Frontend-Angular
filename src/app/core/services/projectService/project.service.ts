import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Project, ProjectRequest } from '../../../models/project.model';
import {
  ProjectMember,
  ProjectMemberRequest,
} from '../../../models/project-member.model';
import { Team, TeamRequest } from '../../../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
   private baseUrl = import.meta.env.NG_APP_API_GATEWAY;
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http
      .get<Project[]>(`${this.baseUrl}/projects`)
      .pipe(catchError(this.handleError));
  }

  getProjectById(id: string): Observable<Project> {
    return this.http
      .get<Project>(`${this.baseUrl}/projects/${id}`)
      .pipe(catchError(this.handleError));
  }

  createProject(project: ProjectRequest): Observable<Project> {
    return this.http
      .post<Project>(`${this.baseUrl}/projects`, project)
      .pipe(catchError(this.handleError));
  }

  updateProject(
    id: string,
    project: ProjectRequest,
  ): Observable<Project> {
    return this.http
      .put<Project>(`${this.baseUrl}/projects/${id}`, project)
      .pipe(catchError(this.handleError));
  }

  deleteProject(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/projects/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getProjectMembers(projectId: string): Observable<ProjectMember[]> {
    return this.http
      .get<ProjectMember[]>(
        `${this.baseUrl}/project_members?projectId=${projectId}`,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError));
  }

  addMember(
    projectId: string,
    memberId: string,
    role?: string
  ): Observable<ProjectMember> {
    const memberRequest: ProjectMemberRequest = {
      projectId,
      userId: memberId,
      role: role as any,
    };
    return this.http
      .post<ProjectMember>(`${this.baseUrl}/project_members`, memberRequest, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  inviteMember(invitation: { projectId: string; userId: string; role?: string }): Observable<ProjectMember> {
    const memberRequest: ProjectMemberRequest = {
      projectId: invitation.projectId,
      userId: invitation.userId,
      role: invitation.role as any,
    };
    // API endpoint: POST /project_members
    // Based on Swagger docs at https://collabspace-delopment.onrender.com/swagger-ui/index.html#/
    return this.http
      .post<ProjectMember>(`${this.baseUrl}/project_members`, memberRequest, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  lookupUserByEmail(email: string): Observable<string> {
    // API endpoint: GET /users/email/{email}
    // Returns user object with id field for email lookup
    return this.http
      .get<{ id: string; email: string }>(`${this.baseUrl}/users/email/${encodeURIComponent(email)}`, {
        headers: this.headers,
      })
      .pipe(
        map((user) => user.id),
        catchError(this.handleError)
      );
  }

  removeMember(projectId: string, memberId: string): Observable<void> {
    return this.http
      .delete<void>(
        `${this.baseUrl}/project_members/${projectId}/${memberId}`,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError));
  }

  getTeams(): Observable<Team[]> {
    return this.http
      .get<Team[]>(`${this.baseUrl}/teams`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getTeamById(id: string): Observable<Team> {
    return this.http
      .get<Team>(`${this.baseUrl}/teams/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  createTeam(team: TeamRequest): Observable<Team> {
    return this.http
      .post<Team>(`${this.baseUrl}/teams`, team, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  updateTeam(id: string, team: TeamRequest): Observable<Team> {
    return this.http
      .put<Team>(`${this.baseUrl}/teams/${id}`, team, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  deleteTeam(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/teams/${id}`, { headers: this.headers })
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
