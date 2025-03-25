import { Component } from '@angular/core';
import { UtilityService } from '../utility.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  username : any = "";
  password : string = "";
  name : string = "";
  role : string = "";
  email : string = "";
  accessproject : string = "";
  address : string = "";
  phone : string = "";
  gender : string = "";
  projects:any = [];
  user:any = [];
  currentPassword: string = '';
  newPassword: string = '';
  repeatNewPassword: string = '';


  constructor(private router: Router,private UtilityService:UtilityService, private route: ActivatedRoute, private toastr: ToastrService,) { 
   
      this.UtilityService.getProjects().subscribe((data) => {
        this.projects = data;
        this.username = sessionStorage.getItem('username');
        this.getUser(this.username);
      });
  
    }

    ngOnInit(): void {
      // Retrieve the parameter value from the route parameters
        // this.getIssue(this.backlogId);
        // this.UtilityService.getProjects().subscribe((data) => {
        //   this.projects = data;
        // });
    }
    convertStringToArray(inputString: string): string[] {
      // Check if the string contains a comma
      console.log('iputString:',inputString)
      if (inputString.includes(',')) {
        // Split the comma-separated string into an array
        return inputString.split(',');
      } else {
        // If no comma is found, create an array with the single item
        return [inputString];
      }      
    }

  editUser() {
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

    this.UtilityService.editUser(this.username, this.password, this.name, this.email, this.address, this.phone, this.gender).subscribe(
      (response)=>{
        console.log(response)

        this.toastr.success('Changes Saved'); 

      },
      (error)=>{
        console.log(error);
      }
    
    );     
  }

  getUser(username:string){
    console.log('getUser called with username:', username);
    this.UtilityService.getUser(username).subscribe((data) => {
      this.user = data;
      console.log('Server response data:',data);
      this.username = this.user.username;
      this.password = this.user.password;
      this.name = this.user.name;
      this.role = this.user.role;
      this.email = this.user.email;
      this.accessproject = this.user.accessproject;
      this.address = this.user.address;
      this.phone = this.user.phone;
      this.gender = this.user.gender;
      console.log('accessproject:', data.accessproject);
      this.projects =  this.convertStringToArray(this.accessproject);
    });
  }

  // cancel() {
  //   // Redirect to another route (e.g., the issue list page) or perform cancel action
  //   this.router.navigate(['/backlog']);
  // }

  chnagepwd(){
  
    if(this.newPassword != this.repeatNewPassword){
      alert("New password doesnt match");
      console.error("error");
      this.toastr.error('New password doesnt match');
    }else{
      this.UtilityService.changepwd(this.username, this.currentPassword, this.newPassword).subscribe(
        (response)=>{
          console.log(response)
          this.toastr.success('Password Changed');     
          this.currentPassword = '';
          this.newPassword= '';
          this.repeatNewPassword = '';
        },
        (error)=>{
          console.error(error);
          this.toastr.error('Invalid Password');       
          this.currentPassword = '';
          this.newPassword= '';
          this.repeatNewPassword = '';
        } 
      );
    }
  }
  cancle(){
    console.log("skjdfb")
    this.router.navigate(['/dashboard']);
  }
}
