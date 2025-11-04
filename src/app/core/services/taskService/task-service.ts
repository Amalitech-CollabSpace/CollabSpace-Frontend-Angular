import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../../models/task';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
   private baseUrl = import.meta.env.NG_APP_API_GATEWAY;
  private http = inject(HttpClient)


  public createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, task)
  }

  public getTask(id: any): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/tasks/${id}`)
  }

  public getAllTasksByProject(id: any): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks/project/${id}`)
  }

  public getAllTasksByAssignee(id: any) {
    return this.http.get(`${this.baseUrl}/tasks/assignee/${id}`)
  }

  public deleteTask(id: number) {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`)
  }

  public editTask(task: Task, id: any): Observable<Task>  {
    return this.http.put<Task>(`${this.baseUrl}/tasks/${id}`, task)
  }

  public updateTaskStatus(status: string, id: any) {
    return this.http.patch(`${this.baseUrl}/tasks/${id}/status?status=${status}`, "")
  }

}
