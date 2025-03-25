import { Component } from '@angular/core';
import { AuthService } from './signin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { FormBuilder, Validators } from '@angular/forms';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class LoginComponent {
  username: string = ''
  password: string = ''
  result: any;

  constructor(private authService: AuthService, private router: Router,  private toastr: ToastrService,private builder: FormBuilder, ) {
    
  }
  ngOnInit(): void {

    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: "90554348345-lgd92ap8dsjplp0nr4bru1pn6d7n2d9u.apps.googleusercontent.com",
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      // @ts-ignore
      google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", width: "100%" } 
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };

  }

  async handleCredentialResponse(response: CredentialResponse) {
    
    // console.log(response);
    // console.log(response.credential);

      this.username = JSON.parse(atob(response.credential.split(".")[1])).email;
      sessionStorage.setItem('username',this.username);
      this.router.navigate(['/dashboard']);
    }

  loginSubmitted() {
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          console.log(response);
          sessionStorage.setItem('username',this.username);
          this.authService.getUserRole(this.username).subscribe(
            (response)=> {
              const role = (response as any).role;

              if (role === 'admin') {
                this.router.navigate(['/admindashboard']);
              } else {
                this.router.navigate(['/dashboard']);
              }
              
            }
          )
        },
        (error) => {
          console.error(error);
          this.router.navigate(['/signin']);
          this.toastr.error('Invalid credentials');
        }
        );   
  }
}
