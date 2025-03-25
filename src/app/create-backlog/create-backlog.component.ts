import { Component } from '@angular/core';
import { UtilityService } from '../utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-backlog',
  templateUrl: './create-backlog.component.html',
  styleUrls: ['./create-backlog.component.css']
})
export class CreateBacklogComponent {
  project: string = '';
  issuetype: string= '';
  status: string= '';
  summary: string= '';
  description: string= '';
  assignee: string= '';
  reporter: string= '';
  tags:string = "";
  priority:string = "";
  projects: any[] = [];
  users: any[] = [];

  constructor(private router: Router,private UtilityService:UtilityService) { 
   
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

    this.UtilityService.createBacklog(this.project, this.issuetype, this.status, this.summary, this.description, this.assignee, this.reporter,this.tags, this.priority).subscribe(
      (response)=>{
        console.log(response)
        this.router.navigate(['/backlog']);
      },
      (error)=>{
        console.log(error);
      }
    
    );     
  }

  cancel() {
    // Redirect to another route (e.g., the issue list page) or perform cancel action
    this.router.navigate(['/backlog']);
  }
}
