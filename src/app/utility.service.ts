import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { API_BASE_URL } from 'api-config';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  // private apiBaseUrl = 'http://127.0.0.1:5000';
  private apiBaseUrl = API_BASE_URL;

  constructor(private http: HttpClient) { }
  projectNameSource = new BehaviorSubject<string>("");
  currentProjectName = this.projectNameSource.asObservable();

  changeProjectName(projectName: string) {
    this.projectNameSource.next(projectName);
  }

  // setSelectedProject(projectName: string): void {
  //   this.project_name.next(projectName);
  // }

  getTasks(projectName: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/api/getTask/${projectName}`);
    console.log(`${this.apiBaseUrl}/api/getTask/${projectName}`);
  }

  getIssues(projectName: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/api/getIssue/${projectName}`);
  }

  updateTaskStatus(id: string, status: string) {
    return this.http.put(`${this.apiBaseUrl}/api/updateTask/${id}/${status}`, { status });
  }

  getProjects(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/api/getProjects`);
  }

  get_project_users(project:string): Observable<any>{
    const URL = `${this.apiBaseUrl}/api/project_users/${project}`; 
    return this.http.get(URL);
  }

  getProjectInfo(projectName: string): Observable<any> {
    if(projectName && projectName != "")
      return this.http.get(`${this.apiBaseUrl}/api/getProjectInfo/${projectName}`);
    else
      return of();
  }

  //Backlog related APIS

  createBacklog(project: string, issuetype:string,status: string,summary:string,description:string,assignee:string,reporter:string,tags:string, priority:string): Observable<any>{
    const task = { project, issuetype,status,summary,description,assignee,reporter,tags, priority};

    const Url = `${this.apiBaseUrl}/api/createBacklog`; 
    return this.http.post(Url, task);
  }

  editBacklog(id:string, project: string, issuetype:string,status: string,summary:string,description:string,assignee:string,reporter:string,tags:string, priority:string): Observable<any>{
    const task = {project, issuetype,status,summary,description,assignee,reporter,tags, priority};

    const createBacklogUrl = `${this.apiBaseUrl}/api/editBacklog/${id}`; 
    return this.http.put(createBacklogUrl, task);
  }

  getBacklog(id:string): Observable<any>{
    const URL = `${this.apiBaseUrl}/api/getBacklog/${id}`; 
    return this.http.get(URL);
  }

  deleteBacklog(issue_id:any){
    const Url = `${this.apiBaseUrl}/api/deleteBacklog/${issue_id}`; 
    return this.http.delete(Url);
  }
//------

  getUser(username:string): Observable<any>{
    const URL = `${this.apiBaseUrl}/api/getUser/${username}`; 
    return this.http.get(URL);
  }


  editUser( username: string, password: string, name: string, email: string, address: string, phone: string, gender: string): Observable<any>{
    const task = {username, password, name, email, address, phone, gender};

    const createBacklogUrl = `${this.apiBaseUrl}/api/editUser/${username}`; 
    return this.http.put(createBacklogUrl, task);
  }

  createProject(project:string, description:string){
    const task = { project,description};
    console.log(task)
    const Url = `${this.apiBaseUrl}/api/createProject`; 
    return this.http.post(Url, task);
  }

  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }

  changepwd(username: string,password: string, newpassword: string,){
    const task = {username, password, newpassword};

    const createBacklogUrl = `${this.apiBaseUrl}/api/changepwds`; 
    return this.http.put(createBacklogUrl, task);
  }

  gitStatus(project:any){
    // lkk688/DeepDataMiningLearning
    const URL = `https://api.github.com/${project.ownername}/${project.gitname}/commits`; 
    return this.http.get(URL);
  }
}
