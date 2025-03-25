import { Component, Input, ChangeDetectorRef, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from '../utility.service';
import { UpdateTaskService } from "../services/update-task.service";

const editorConfig = {
  // ui: 'pt',
  // language: 'pt',
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "|",
      "strike",
      "code",
      "|", // Não tem ainda
      "bulletedList",
      "numberedList",
    ],
  },
};

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskComponent {
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;  
  @Input() content: any;
  @Input() project_name : string = "";
  //reqd for update task
  currentTaskId: string = '';
  taskToEdit: any = {
    project: '',
    issuetype: '',
    status: '',
    summary: '',
    description: '',
    assignee: '',
    reporter: '',
  };

  //reqd for update-task
  users:any = [];
  @ViewChild('readOnlyModalContent', { static: false }) readOnlyModalContent!: TemplateRef<any>;

  ckeditor = ClassicEditor;
  editorConfig = editorConfig;
  showGit :boolean = false;
  project:any = [];
  gitCommit:any = []
  simpleItems: string[] = [
    "Task 1 name changed",
    "Task 2 completed require additional fucntions",
    "Project name changed",
  ];
  commitMsg:any = [];
  uploadedFileName: string | null = null;

  constructor(private router: Router,private UtilityService:UtilityService, private taskService : UpdateTaskService, private cdr: ChangeDetectorRef, private modalService: NgbModal) { 


  }

  ngOnInit() {
    console.log("oninitia")
    this.UtilityService.getProjectInfo(this.project_name).subscribe(
      (response) => {
        this.project = response[0];
        // console.log("github api")
        // console.log(this.project)
        // if(this.project.ownername && this.project.gitname && this.project.ownername!="" && this.project.gitname!=""){
        
        //   this.UtilityService.gitStatus(this.project).subscribe(
        //     (response) => {
        //       this.gitCommit = response;
        //       console.log("github api")
        //       console.log(this.gitCommit)
        //       for (let i in this.gitCommit){
        //         this.commitMsg.push(this.gitCommit[i].commit.message)
        //       }
        //       // console.log(this.gitCommit[0].commit.message); // Handle the response from the server
        //       this.showGit = this.containsString(this.content.description,this.commitMsg)
        //       console.log("Git------")
        //       console.log(this.showGit)
        //     },
        //     (error) => {
        //       console.error(error); // Handle any errors
        //     }
        //   );
        // }

      },
      (error) => {
        console.error(error); // Handle any errors
      }
    );

    //reqd for update Task
    this.fetchProjectUsers(this.project_name);
  }

  //reqd for updateTask
  fetchProjectUsers(projectName: string) {
    this.UtilityService.get_project_users(projectName).subscribe(
      (data) => {
        console.log('Fetched users:', data);  // Log the fetched data
        this.users = data.project_users;
      },
      (error) => {
        console.error('Error fetching project users: ',error);
      }
    );
  }

  containsString(s: string, stringList: string[]): boolean {
    for (const stringInList of stringList) {
      if (stringInList.includes(s)) {
        return true;
      }
    }
    return false;
  }

  handleFileInput(event: any): void {
    const file: File = event.target.files[0];
    
    if (file) {
      // Do something with the file, e.g., upload it to a server
      this.uploadedFileName = file.name;
      console.log('Uploaded file:', file.name);
    }
  }

  getPriorityIconClass(): { [key: string]: boolean } {
    if (this.content && this.content.issuetype) {
      return {
        "fas fa-icon type fa-none":this.content.issuetype.trim() == 'none',
        "fas fa-icon type fa-tasks": this.content.issuetype.trim() == 'task',
        "fas fa-icon type fa-bug": this.content.issuetype.trim() == 'bug',
        // Add more classes if needed
      };
    }
    // Handle the case when this.content or this.content.issuetype is undefined
    return {};
  }

  openModal(content: TemplateRef<any>) {
    if (this.content._id && this.content._id.$oid) {
      this.currentTaskId = this.content._id.$oid;
      this.fetchTaskDetails(this.currentTaskId, content);
    } else {
      console.error('Task ID is not in the expected format:', this.content._id);
    }
  }

fetchTaskDetails(taskId: string, content: TemplateRef<any>) {
  this.taskService.getTask(taskId).subscribe(
    (taskData) => {
      this.taskToEdit = taskData;
      console.log(taskData);
      this.cdr.detectChanges();
      this.modalService.open(content); // Open the modal here
    },
    (error) => {
      console.error('Error fetching task details', error);
    }
  );
}

saveChanges() {
  if (this.currentTaskId && this.validateTask(this.taskToEdit)) {
    this.taskService.updateTask(this.currentTaskId, this.taskToEdit).subscribe(
      response => {
        // Handle response here, show success message using SweetAlert2
        Swal.fire({
          title: 'Success!',
          text: 'Task updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.modalService.dismissAll(); // Close the modal if update is successful
          }
        });
      },
      error => {
        // Handle error here, show error message using SweetAlert2
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem updating the task',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  } else {
    // Handle validation error
    Swal.fire({
      title: 'Invalid Data',
      text: 'Please check the task details and try again.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }
}

validateTask(task: any): boolean {
  // Check if the required fields are not empty or null
  // Add more validation as needed based on your requirements
  const isValidProject = task.project && task.project.trim() !== '';
  const isValidIssueType = task.issuetype && task.issuetype.trim() !== '';
  const isValidStatus = task.status && task.status.trim() !== '';
  const isValidSummary = task.summary && task.summary.trim() !== '';
  const isValidDescription = task.description && task.description.trim() !== '';
  const isValidAssignee = task.assignee && task.assignee.trim() !== '';
  const isValidReporter = task.reporter && task.reporter.trim() !== '';

  // Return true only if all validations pass
  return isValidProject && isValidIssueType && isValidStatus &&
         isValidSummary && isValidDescription && isValidAssignee &&
         isValidReporter;
}

closeModal() {
  this.modalService.dismissAll();
}

openReadOnlyModal() {
  if (this.content._id && this.content._id.$oid) {
    this.currentTaskId = this.content._id.$oid;
    this.fetchTaskDetailsForView(this.currentTaskId);
    this.modalService.open(this.readOnlyModalContent);
  } else {
    console.error('Task ID is not in the expected format:', this.content._id);
  }
}

// Modify the method to only require taskId if content isn't used
fetchTaskDetailsForView(taskId: string) {
  this.taskService.getTask(taskId).subscribe(
    (taskData) => {
      this.taskToEdit = taskData;
      console.log(taskData);
      this.cdr.detectChanges();
      // Open the modal inside the subscription callback
      this.modalService.open(this.readOnlyModalContent);
    },
    (error) => {
      console.error('Error fetching task details', error);
    }
  );
}

}
