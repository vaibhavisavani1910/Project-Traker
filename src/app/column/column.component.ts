import { Component, Input, SimpleChanges, OnChanges} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// import { CreateIssueComponent } from '../create-task-modal/create-task-modal.component';
import { CreateTaskServiceService } from '../create-task-modal/create-task-service.service'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {
  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  // }

  constructor(private router: Router, private http:HttpClient, private UtilityService: UtilityService) {}

  todoTasks: any[] = [];
  inProgTasks: any[] = [];
  doneTasks: any[] = [];
  backup_todoTasks: any[] = [];
  backup_inProgTasks: any[] = [];
  backup_doneTasks: any[] = [];
  tasks: any[] = [];
  @Input() project_name: string = "";
  assignedToMeToggle:boolean = false;

  ngOnInit(): void {
    this.UtilityService.currentProjectName.subscribe(projectName => {
      this.project_name = projectName;
      console.log("From col")
      console.log(this.project_name)
      this.UtilityService.getTasks(this.project_name).subscribe(data => {
        this.tasks = data;
        console.log(data);
        this.todoTasks = this.tasks.filter((task) => task.status === 'to-do');
        this.inProgTasks = this.tasks.filter((task) => task.status === 'in-progress');
        this.doneTasks = this.tasks.filter((task) => task.status === 'done');
     });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.UtilityService.getTasks(this.project_name).subscribe(data => {
      this.tasks = data;
      console.log(data);
      this.todoTasks = this.tasks.filter((task) => task.status === 'to-do');
      this.inProgTasks = this.tasks.filter((task) => task.status === 'in-progress');
      this.doneTasks = this.tasks.filter((task) => task.status === 'done');
   });
  }

  drop(event: any) {

    let task_id = event.previousContainer.data[event.previousIndex]._id.$oid;
    let new_status = event.container.id;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
        console.log(event.previousContainer.data + '-'+event.container.data +"-"+
        event.previousIndex+"-"+ event.currentIndex);

        //Update status of task

        this.UtilityService.updateTaskStatus(task_id, new_status).subscribe(
          (response) => {
            console.log(response); // Handle the response from the server
          },
          (error) => {
            console.error(error); // Handle any errors
          }
        );
        
    }
  }
  
  
  openCreateTask()
  {
    this.router.navigate(['/createTask'])
  }
  openCreateProject(){
    this.router.navigate(['/createProject'])
  }

  assignedToMe(){
    this.UtilityService.getTasks(this.project_name).subscribe(data => {
      this.tasks = data;
      console.log(data);
      this.todoTasks = this.tasks.filter((task) => task.status === 'to-do');
      this.inProgTasks = this.tasks.filter((task) => task.status === 'in-progress');
      this.doneTasks = this.tasks.filter((task) => task.status === 'done');
      if(this.assignedToMeToggle==false){
        this.assignedToMeToggle=true;
        let username = sessionStorage.getItem('username');
        this.todoTasks = this.tasks.filter((task) => task.status === 'to-do' && task.assignee == username);
        this.inProgTasks = this.tasks.filter((task) => task.status === 'in-progress' && task.assignee == username);
        this.doneTasks = this.tasks.filter((task) => task.status === 'done' && task.assignee == username);
      }else{
        this.assignedToMeToggle = false;
        this.todoTasks = this.tasks.filter((task) => task.status === 'to-do');
        this.inProgTasks = this.tasks.filter((task) => task.status === 'in-progress');
        this.doneTasks = this.tasks.filter((task) => task.status === 'done');
      }
   });
    
  }
}
