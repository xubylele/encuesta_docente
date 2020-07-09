import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject} from 'rxjs';
import { sectionList } from './../models/encuesta'
import { RespuestaI } from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  HOST:string = 'http://localhost:300/api/';
  HOST_POLLS:string = `${this.HOST}polls/`;
  HOST_TEACHERSBADGES:string = `${this.HOST}teachersbadges/`;
  HOST_PARTICIPANTLIST:string = `${this.HOST}participantlist/`;
  HOST_USERS:string = `${this.HOST}users/`;
  HOST_COURSES:string = `${this.HOST}courses/`;

  constructor(private httpClient: HttpClient) { }

  getCourses(){
    let token = localStorage.getItem("ACCESS_TOKEN");
    const headers = new HttpHeaders ({
      'auth-token':token
    });
    return this.httpClient.get<any>(`${this.HOST_COURSES}getallcourses`,{headers})
  }

  


}
