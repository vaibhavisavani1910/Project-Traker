import { Component } from '@angular/core';
import { UtilityService } from '../utility.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-backlog',
  templateUrl: './edit-backlog.component.html',
  styleUrls: ['./edit-backlog.component.css']
})
export class EditBacklogComponent {
  issue:any = "";
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
  backlogId: string="";

  constructor(private router: Router,private UtilityService:UtilityService, private route: ActivatedRoute) { 
   
    this.UtilityService.currentProjectName.subscribe(projectName => {
      this.project = projectName;
      this.UtilityService.get_project_users(this.project).subscribe(data => {
        this.users = data.project_users;
        console.log(data.type);
      });
    });
  
    }

    ngOnInit(): void {
      // Retrieve the parameter value from the route parameters
      this.route.params.subscribe(params => {
        this.backlogId = params['id'];
        this.getIssue(this.backlogId);
      });
    }

  editIssue() {
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

    this.UtilityService.editBacklog(this.backlogId ,this.project, this.issuetype, this.status, this.summary, this.description, this.assignee, this.reporter,this.tags, this.priority).subscribe(
      (response)=>{
        console.log(response)
        this.router.navigate(['/backlog']);
      },
      (error)=>{
        console.log(error);
      }
    
    );     
  }

  getIssue(id:string){
    this.UtilityService.getBacklog(id).subscribe((data) => {
      this.issue = data;
      console.log(data);
      this.project = this.issue.project;
      this.issuetype = this.issue.issuetype;
      this.status = this.issue.status;
      this.summary = this.issue.summary;
      this.description = this.issue.description;
      this.assignee = this.issue.assignee;
      this.reporter = this.issue.reporter;
      this.tags = this.issue.tags;
      this.priority = this.issue.priority;
    });
  }

  cancel() {
    // Redirect to another route (e.g., the issue list page) or perform cancel action
    this.router.navigate(['/backlog']);
  }
}
