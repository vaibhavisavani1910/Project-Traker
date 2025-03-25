import { Component } from '@angular/core';
import { AuthService } from '../signin/signin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent {
  constructor(private authService: AuthService, private router: Router){}
  logout(){
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
