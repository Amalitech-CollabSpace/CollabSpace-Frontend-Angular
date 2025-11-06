import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly baseUrl = import.meta.env.NG_APP_API_GATEWAY;
  private readonly http = inject(HttpClient);

  public createTask(task: Task) {
    return this.http.post(`${this.baseUrl}/tasks`, task);
  }

  public getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/tasks/${id}`);
  }

  public getAllTasksByProject(id: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks/project/${id}`);
  }

  public getAllTasksByAssignee(id: string) {
    return this.http.get(`${this.baseUrl}/tasks/assignee/${id}`);
  }

  public deleteTask(id: string) {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`);
  }

  public editTask(task: Task, id: string) {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, task);
  }

  public updateTaskStatus(status: string, id: string) {
    return this.http.patch(
      `${this.baseUrl}/tasks/${id}/status?status=${status}`,
      ''
    );
  }
}
