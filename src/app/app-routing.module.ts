import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColumnComponent } from './column/column.component';
import { LoginComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateIssueComponent } from './create-task-modal/create-task-modal.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { GraphComponent } from './graph/graph.component';
import { BacklogComponent } from './backlog/backlog.component';
import { CreateBacklogComponent } from './create-backlog/create-backlog.component';
import { EditBacklogComponent } from './edit-backlog/edit-backlog.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './guard/guard.service';

const routes: Routes = [
  // { path: '', redirectTo: '/signin', pathMatch: 'full' },
  // { path: '', redirectTo: '/admindashboard', pathMatch: 'full' },
  //  { path: '', redirectTo: '/admindashboard', pathMatch: 'full' },
  { path:'admindashboard', component:AdmindashboardComponent},
  { path:'graph',component:GraphComponent},
  { path:'signin', component:LoginComponent},
  // { path: 'column1', component: ColumnComponent },
  // { path: 'column2', component: ColumnComponent },
  // { path: 'column3', component: ColumnComponent },
  // { path: 'dashboard', component: DashboardComponent },
  {path:'createTask', component:CreateIssueComponent,canActivate:[AuthGuard]},
  {path:'createBacklog', component:CreateBacklogComponent,canActivate:[AuthGuard]},
  {path:'createProject', component:CreateProjectComponent,canActivate:[AuthGuard]},
  {path:'user', component:UserComponent,canActivate:[AuthGuard]},
    { path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'backlog', component: BacklogComponent ,canActivate:[AuthGuard]},
      { path: 'home', component: ColumnComponent,canActivate:[AuthGuard] },
      { path: 'dashboard', component: ColumnComponent ,canActivate:[AuthGuard]},
  ]
  },
  { path: 'editBacklog/:id', component: EditBacklogComponent ,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
