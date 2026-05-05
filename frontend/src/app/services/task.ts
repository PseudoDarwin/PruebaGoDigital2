import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5187/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    const url = `${this.apiUrl}?t=${new Date().getTime()}`;
    return this.http.get<Task[]>(url);
  }

  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }


  updateTask(id: number, task: Task): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, task);
  }
}