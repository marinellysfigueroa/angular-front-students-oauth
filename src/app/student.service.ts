import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  private oauthURL=environment.urlOauthService;
  private baseURL=environment.urlService;
  private user='frontStudentUser';
  private pass=']&$X@SKV*fg~%iyzF';

  constructor(private http:HttpClient) { }

  getToken(): Observable<any>{

    let params = new URLSearchParams();   
    params.append('grant_type','password');
    params.append('username', this.user);
    params.append('password', this.pass);
   
    let headers = 
    new HttpHeaders({'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'POST','Access-Control-Allow-Headers': 'Content-Type','Authorization': 'Basic YW5ndWxhci1hcHA6NG5ndWw0cnBhc3M=','Content-type': 'application/x-www-form-urlencoded'});
    return this.http.post(this.oauthURL,params.toString(),{ headers: headers });

  }

  getStudentList(): Observable<any>{
   
    let headers = new HttpHeaders({'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET','Access-Control-Allow-Headers': 'Content-Type','Authorization': 'bearer 6e56f3bd-5a22-4ece-83c2-f67476b3b583'});    
    return this.http.get(this.baseURL,{headers: headers});

  }
  createStudent(student: object): Observable<object> { 
    let headers = new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'POST','Access-Control-Allow-Headers': 'Content-Type','Authorization': 'bearer 6e56f3bd-5a22-4ece-83c2-f67476b3b583'});   
    return this.http.post(this.baseURL, student,{headers: headers});  
  }  

  deleteStudent(id: number): Observable<any> {  
    let headers = new HttpHeaders({'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'DELETE','Access-Control-Allow-Headers': 'Content-Type','Authorization': 'bearer 6e56f3bd-5a22-4ece-83c2-f67476b3b583'});   
    return this.http.delete(this.baseURL+'/'+id, {headers: headers});  
  }  

  getStudent(id: number): Observable<Object> {
    let headers = new HttpHeaders({'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET','Access-Control-Allow-Headers': 'Content-Type','Authorization': 'bearer 6e56f3bd-5a22-4ece-83c2-f67476b3b583'});   
    return this.http.get(this.baseURL+'/'+id,{headers: headers});  
  }  

  updateStudent(id: number, student: object): Observable<Object> {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'PUT','Access-Control-Allow-Headers': 'Content-Type','Authorization': 'bearer 6e56f3bd-5a22-4ece-83c2-f67476b3b583'});     
    return this.http.put(this.baseURL+'/'+id, student,{headers: headers});  
  }  



}
