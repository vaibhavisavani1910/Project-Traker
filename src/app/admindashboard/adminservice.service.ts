import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// src/app/admindashcomponent/admindashcomponent.component.ts
import { API_BASE_URL } from 'api-config';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  // private apiBaseUrl = 'http://127.0.0.1:5000';
  // private apiBaseUrl: string = 'http://3.144.134.64:5000';
  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get(`${API_BASE_URL}/api/getProjects`);
  }

  // updateTaskStatus(id: string, status: string) {
  //   return this.http.put(`${this.apiBaseUrl}/api/updateTask/${id}/${status}`, { status });
  // }

}
