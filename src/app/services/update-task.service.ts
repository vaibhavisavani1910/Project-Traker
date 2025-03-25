import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'api-config';

@Injectable({
  providedIn: 'root'
})
export class UpdateTaskService {
  private apiUrl = `${API_BASE_URL}/api/updateTask/`;
  private getTaskByIdUrl = `${API_BASE_URL}/api/tasks/`;


  constructor(private http: HttpClient) { }

  getTask(taskId: string): Observable<any> {
    return this.http.get(`${this.getTaskByIdUrl}${taskId}`);

  }

  updateTask(taskId: string, taskData: any) {
    return this.http.put(`${this.apiUrl}${taskId}`, taskData);
  }

}
