import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject} from 'rxjs';
import { sectionList } from './../models/encuesta'
import { RespuestaI } from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  HOST:string = 'http://localhost:3000/api/';
  HOST_POLLS:string = `${this.HOST}polls/`;
  HOST_TEACHERSBADGES:string = `${this.HOST}teachersbadges/`;
  HOST_PARTICIPANTLIST:string = `${this.HOST}participantlist/`;
  HOST_USERS:string = `${this.HOST}users/`;
  HOST_COURSES:string = `${this.HOST}courses/`;
  HOST_SECTIONS:string = `${this.HOST}section/`;

  constructor(private httpClient: HttpClient) { }

  getCourses(){
    let token = localStorage.getItem("ACCESS_TOKEN");
    const headers = new HttpHeaders ({
      'auth-token':token
    });
    return this.httpClient.get<any>(`${this.HOST_USERS}getallusercourses`,{headers})
  }

  getAveragesPoll():Observable<any>{
    let token = localStorage.getItem("ACCESS_TOKEN");
    const headers = new HttpHeaders ({
      'auth-token':token
    });
    return this.httpClient.get<any>(`${this.HOST_SECTIONS}averagePerSection`,{headers})
  }

  getDataCourse(courseID:string):Observable<any>{
    let token = localStorage.getItem("ACCESS_TOKEN");
    const headers = new HttpHeaders ({
      'auth-token':token,
    });
    let url = 'http://localhost:3000/api/section/detailPerSection/'.concat(courseID)
    console.log(url)
    return this.httpClient.get<any>(url,{headers})
  }

}
