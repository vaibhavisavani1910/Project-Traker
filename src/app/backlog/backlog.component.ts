import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from '../utility.service';
import { CreateTaskServiceService } from "../create-task-modal/create-task-service.service"

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent {
  constructor(private router: Router, private http:HttpClient, private UtilityService: UtilityService, private CreateTaskServiceService:CreateTaskServiceService) {}

  project_name: string = "";

  issues: any[] = [];
  ngOnInit() {
    this.UtilityService.currentProjectName.subscribe(projectName => {
      this.project_name = projectName;
      console.log("From Backlog")
      console.log(this.project_name)
      this.UtilityService.getIssues(this.project_name).subscribe(data => {
        this.issues = data;
        console.log(data);
      });
    });
  }

  openCreateBacklog()
  {
    this.router.navigate(['/createBacklog'])
  }

  deleteBacklog(issue: any ){
    this.UtilityService.deleteBacklog(issue._id.$oid).subscribe(data => {
      console.log("deleteIssue");
      this.UtilityService.getIssues(this.project_name).subscribe(data => {
        this.issues = data;
        console.log(data);
      });
    });
  }

  editBacklog(issue: any){
    this.router.navigate(['/editBacklog/'+issue._id.$oid])
  }
  createTask(issue: any){

    this.CreateTaskServiceService.createTask(issue.project, issue.issuetype, issue.status, issue.summary, issue.description, issue.assignee, issue.reporter, issue.priority).subscribe(
      (response)=>{
        console.log(response)
      },
      (error)=>{
        console.log(error);
      }
    
    );
    this.deleteBacklog(issue);     
  }

  
}
