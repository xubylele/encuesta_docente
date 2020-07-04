import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject} from 'rxjs';
import { sectionList } from './../models/encuesta'


@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  HOST:string = 'http://localhost:3000/api/section';

  constructor(private http:HttpClient) { }


  getPreguntas() : Observable<any>{
    return this.http.get<any>(`${this.HOST}/list`)
  }

}
