import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'api-config';
@Injectable({
  providedIn: 'root'
})
export class GraphserviceService {
   
  // private apiBaseUrl = API_BASE_URL;
  
    private apiUrl = `${API_BASE_URL}/api/graph`; // Update with your Flask API URL
    private usersListurl = `${API_BASE_URL}/api/project_users`;
    private newusersListurl = `${API_BASE_URL}/api/new_users`;
  
    constructor(private http: HttpClient) { }
  
    getData(projectName: string): Observable<any> {
      const graphurl = `${this.apiUrl}/${projectName}`;
      return this.http.get(graphurl);
      // return this.http.get<any>('this.apiUrl/${projectName}');
    }

    getUsers(projectName: string): Observable<any> {
      const url = `${this.usersListurl}/${projectName}`;
      return this.http.get(url);
      // return this.http.get<any>('this.apiUrl/${projectName}');
    }

    getNewUsers(projectName: string): Observable<any> {
      const newurl = `${this.newusersListurl}/${projectName}`;
      return this.http.get(newurl);
      // return this.http.get<any>('this.apiUrl/${projectName}');
    }
    updateprojecttouser(projectName: any, selectedUsername: any) {
      console.log("inservice ts",projectName)
      console.log("inservice ts",selectedUsername)
      const newurl = `/addusertoproject/${selectedUsername}/${projectName}`;
      return this.http.get(newurl);
    }
    deleteprojectfromuser(projectName: any, selectedUsername1: any) {
      console.log("inservice ts",projectName)
      console.log("inservice ts",selectedUsername1)
      const newurl = `${API_BASE_URL}/deleteusertoproject/${selectedUsername1}/${projectName}`;
      return this.http.get(newurl);
    }
    
  
  
}
