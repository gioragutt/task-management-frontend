import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskStatus } from './task.model';
import { HttpClient } from '@angular/common/http';

const TASKS_PATH = 'http://localhost:3000/tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(TASKS_PATH);
  }

  deleteTask(taskId: number): Observable<{}> {
    return this.http.delete(`${TASKS_PATH}/${taskId}`);
  }

  updateTaskStatus(taskId: number, status: TaskStatus): Observable<Task> {
    return this.http.patch<Task>(`${TASKS_PATH}/${taskId}/status`, { status });
  }
}
