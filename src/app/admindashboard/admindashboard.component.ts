import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from './adminservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
 
navigateToProjectDetail(projectName: string) {
  this.router.navigate(['/graph', { projectName: projectName }]);}
  // projects = [
  //   { id: 1, name: 'Project 1', description: 'Description of Project 1' },
  //   { id: 2, name: 'Project 2', description: 'Description of Project 2' },
  //   { id: 3, name: 'Project 3', description: 'Description of Project 3' }
  //   // Add more projects as needed
  // ];
 

 // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  // }

projects: any[] = []; // Define the 'projects' array property

  constructor(private adminservice: AdminserviceService,private router: Router) {}

  ngOnInit() {
    this.adminservice.getProjects().subscribe((data) => {
      this.projects = data;
      console.log(this.projects) // Assuming 'data' contains the received array
    });
  }
}





