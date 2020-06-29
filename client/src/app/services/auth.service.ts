import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfesorI } from '../models/profesor';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject} from 'rxjs';
//import { User } from '../models/user';

@Injectable()
export class AuthService {
  AUTH_SERVER:string = 'http://localhost:3000/api';
  authSubject = new BehaviorSubject(false);
  private token:string;
  constructor(private httpClient: HttpClient) { }

  /*RegisterMethod*/
  register(user:ProfesorI):Observable<JwtResponseI>{
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`,user) 
      .pipe(tap(
      (res:JwtResponseI) => { 
        if(res){
          //guardar token
        }
      }

    ))
  }
 
  /*Login Method*/
  login(user:ProfesorI):Observable<any>{
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/login`,user)
      .pipe(tap(
        (res:any) => {
          if(res){
            console.log('Inicio sesion')
            console.log(`${this.AUTH_SERVER}/login`)
          }
        }

      ))
  }


}
