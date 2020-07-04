import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject} from 'rxjs';
import { sectionList } from './../models/encuesta'
import { RespuestaI } from '../models/respuesta';


@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  HOST:string = 'http://localhost:3000/api/section';
  HOST_PARTICIPANT:string = 'http://localhost:3000/api/participantlist';
  httpClient: any;

  constructor(private http:HttpClient) { }


  getPreguntas() : Observable<any>{
    return this.http.get<any>(`${this.HOST}/list`)
  }

  getCoursesAlumno() : Observable<any>{
    let token = localStorage.getItem("ACCESS_TOKEN");
    console.log(token)
    const headers = new HttpHeaders ({
      'auth-token':token
    });
    return this.http.get<any>(`${this.HOST_PARTICIPANT}/getCourses`,{headers})
  }

  /*postEncuesta(respuestas):Observable<any>{
    
  }*/

}
