import { Component } from '@angular/core';
import { UtilityService } from '../utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  project: string = '';
  description: string= '';
  ownername:string="";
  gitname:string="";

  constructor(private router: Router,private UtilityService:UtilityService) { 
  
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

    this.UtilityService.createProject(this.project, this.description).subscribe(
      (response)=>{
        console.log(response)
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
