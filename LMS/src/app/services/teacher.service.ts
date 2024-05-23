import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }


  
  getTHomeData(path:any,rmn:any,usertype:any){
    return this.http.get(config.apiUrl +path + rmn + usertype);
  }
}
