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
    return this.http.post(`${this.baseUrl}`, task)
  }

  public getTask(id: number) {
    return this.http.get(`${this.baseUrl}`)
  }

  public getAllTask() {
    return this.http.get(`${this.baseUrl}`)
  }

  public deleteTask(id: number) {
    return this.http.delete(`${this.baseUrl}`)
  }

  public editTask(task: Task) {
    return this.http.put(`${this.baseUrl}`, task)
  }

}
