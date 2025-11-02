import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../../models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl=environment.nodeApiURL
  private http = inject(HttpClient)


  public createTask(task: Task) {
    return this.http.post(`${this.baseUrl}/tasks`, task)
  }

  public getTask(id: number) {
    return this.http.get(`${this.baseUrl}/tasks/${id}`)
  }

  public getAllTasksByProject(id: any) {
    return this.http.get(`${this.baseUrl}/tasks/project/${id}`)
  }

  public getAllTasksByAssignee(id: any) {
    return this.http.get(`${this.baseUrl}/tasks/assignee/${id}`)
  }

  public deleteTask(id: number) {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`)
  }

  public editTask(task: Task, id: any) {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, task)
  }

  public updateTaskStatus(status: string, id: any) {
    return this.http.patch(`${this.baseUrl}/tasks/${id}/status?status=${status}`, "")
  }

}
