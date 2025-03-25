import { Component } from '@angular/core';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  projects: any[] = [];
  current_project = "";
  constructor(private UtilityService: UtilityService) {
  }

  ngOnInit() { 

    this.UtilityService.getProjects().subscribe((data) => {
      this.projects = data;
      this.UtilityService.currentProjectName.subscribe(projectName => {
        if(projectName=="")
        this.UtilityService.changeProjectName(this.projects[0].name);
        // Do something with the current project name in the sidebar
      });
    });



  }

  changeProject(project_name:any){
    this.current_project = project_name;
    console.log("project cganged");
    console.log(project_name);
  }

}
