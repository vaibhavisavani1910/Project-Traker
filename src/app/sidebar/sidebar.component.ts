import { Component , EventEmitter, Output, Input } from '@angular/core';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  
  constructor(private UtilityService: UtilityService) {
    
  }
  @Input() projects:any[] = [];
  @Output() projectChangeEmmiter:EventEmitter<string> 
  = new EventEmitter<string>(); 


  changeProject(projectName: string) {
    this.UtilityService.changeProjectName(projectName);
  }
}
