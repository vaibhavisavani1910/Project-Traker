import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ColumnComponent } from './column/column.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskTrackerComponent } from './task-tracker/task-tracker.component';
import { TaskComponent } from './task/task.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CreateIssueComponent } from './create-task-modal/create-task-modal.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { AdminsidebarComponent } from './adminsidebar/adminsidebar.component';
import { GraphComponent } from './graph/graph.component';
import { NgChartsModule, NgChartsConfiguration  } from 'ng2-charts';
import { BacklogComponent } from './backlog/backlog.component';
import { CreateBacklogComponent } from './create-backlog/create-backlog.component';
import { EditBacklogComponent } from './edit-backlog/edit-backlog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UserComponent } from './user/user.component';
import { ToastrModule } from 'ngx-toastr';
import { ValidatorsDirective } from './directives/validators.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ColumnComponent,
    TaskTrackerComponent,
    TaskComponent,
    DashboardComponent,
    LoginComponent,
    CreateIssueComponent,
    AdmindashboardComponent,
    AdminheaderComponent,
    AdminsidebarComponent,
    GraphComponent,
    BacklogComponent,
    CreateBacklogComponent,
    EditBacklogComponent,
    CreateProjectComponent,
    UserComponent,
    ValidatorsDirective,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    BrowserModule,
    CKEditorModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    NgChartsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Set the default toast timeout
      positionClass: 'toast-top-right', // Set the default position of toasts
      preventDuplicates: true, // Avoid duplicate toasts
    })
  ],
  providers: [{ provide: NgChartsConfiguration, useValue: { generateColors: false }}],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
