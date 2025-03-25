import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateIssueComponent } from './create-task-modal.component';
import { UtilityService } from '../utility.service';
import { API_BASE_URL } from 'api-config';
@Injectable({
  providedIn: 'root'
})
export class CreateTaskServiceService {
  
  // private baseUrl: string = 'http://127.0.0.1:5000'; 
    private baseUrl: string = API_BASE_URL; 
  // Set your base URL here
  projects: any[] = [];
  constructor(private http: HttpClient, private UtilityService: UtilityService) {
    this.UtilityService.getProjects().subscribe((data) => {
      this.projects = data;
    });

  }

  createTask(project: string, issuetype:string,status: string,summary:string,description:string,assignee:string,reporter:string,priority:string) {
    const task = { project, issuetype,status,summary,description,assignee,reporter,priority};

    const createTaskUrl = `${this.baseUrl}/api/createTask`; // Create the full URL
    return this.http.post(createTaskUrl, task);
  }
}
