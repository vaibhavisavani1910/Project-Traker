import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from 'api-config';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
//this is for production
  private baseUrl: string = `${API_BASE_URL}`;
  
  //use this for local
  //private baseUrl: string = 'http://127.0.0.1:5000'; // Set your base URL here

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const user = { username, password };
    const loginUrl = `${this.baseUrl}/api/login`; // Create the full URL
    return this.http.post(loginUrl, user);
  }

  getUserRole(username: string)
  {
    const user = { username };
    const loginUrl = `${this.baseUrl}/api/getUserRole`; // Create the full URL
    return this.http.post(loginUrl, user);
  }

  logout(){
    sessionStorage.clear();
  }
}


