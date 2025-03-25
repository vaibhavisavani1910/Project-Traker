import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { IssueService } from './issue.service';
import { CreateTaskServiceService } from './create-task-service.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.css'],
})
export class CreateIssueComponent {
  // Define properties for form data
  project: string = '';
  issuetype: string= '';
  status: string= '';
  summary: string= '';
  priority: string= '';
  description: string= '';
  assignee: string= '';
  reporter: string= '';
  projects: any[] = [];
  users: any[] = [];

  constructor(private router: Router,private createTaskServiceService:CreateTaskServiceService, private UtilityService:UtilityService) {
   
    this.UtilityService.getProjects().subscribe((data) => {
      this.projects = data;
    });
    this.UtilityService.currentProjectName.subscribe(projectName => {
      this.project = projectName;
      this.UtilityService.get_project_users(this.project).subscribe(data => {
        this.users = data.project_users;
        console.log(data.type);
      });
    });
    
  }
  createIssue() {
    // Prepare the issue data from form inputs
    // const issueData = {
    //   project: this.selectedProject,
    //   issueType: this.selectedIssueType,
    //   status: this.selectedStatus,
    //   summary: this.summary,
    //   description: this.description,
    //   assignee: this.selectedAssignee,
    //   reporter: this.selectedReporter,
    // };

    this.createTaskServiceService.createTask(this.project, this.issuetype, this.status, this.summary, this.description, this.assignee, this.reporter, this.priority).subscribe(
      (response)=>{
        console.log(this.priority)
        this.router.navigate(['/dashboard']);
      },
      (error)=>{
        console.log(error);
      }
    
    );     
  }

  cancel() {
    // Redirect to another route (e.g., the issue list page) or perform cancel action
    this.router.navigate(['/dashboard']);
  }
}
