import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { GraphserviceService } from './graphservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [
    { data: [], label: 'Series A' },
  ];
  projectName: any;
  description: any;
  users: any;
  newusers: any;
  selectedUsername: any;
  selectedUsername1: any;
  message:string | undefined;
  
  

  constructor(private dataService: GraphserviceService,private route: ActivatedRoute, private router:Router,private http: HttpClient) {
    // this.projectName = this.route.snapshot?.root?.firstChild?.snapshot?.data?.state?.projectName;
   }

  ngOnInit() {
    this.projectName = this.route.snapshot.paramMap.get('projectName');
      console.log("projectbname",this.projectName)
    this.dataService.getData(this.projectName).subscribe(data => {
      this.barChartLabels = data.labels;
      this.barChartData[0].data = data.values;
      this.description=data.project_description;
      console.log(this.barChartData[0].data)
      console.log(this.barChartLabels)
      
    });
    this.dataService.getUsers(this.projectName).subscribe(data=>{
        this.users = data.project_users;
        console.log(this.users);
    });
    this.dataService.getNewUsers(this.projectName).subscribe(data=>{
      this.newusers = data.new_project_users;
      console.log(this.newusers);
    });
    
  }
  Adduser(){
    console.log('Selected Username:', this.selectedUsername);
    console.log('Project Name:', this.projectName);

    this.dataService.updateprojecttouser(this.projectName,this.selectedUsername).subscribe(data=>{
      alert("User added successfully");
      // location.reload();
     
     this.router.navigate(['/graph', { projectName: this.projectName }])
    });
    
  }
  Removeuser(){
    console.log('Selected Username:', this.selectedUsername1);
    console.log('Project Name:', this.projectName);

    this.dataService.deleteprojectfromuser(this.projectName,this.selectedUsername1).subscribe(data=>{
     alert("User removed succesfully");
      this.router.navigate(['/graph', { projectName: this.projectName }])
    //  location.reload();

    });
    
  }
}
