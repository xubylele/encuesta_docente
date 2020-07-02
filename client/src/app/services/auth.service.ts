import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject} from 'rxjs';


@Injectable()
export class AuthService {
  AUTH_SERVER:string = 'http://localhost:3000/api';
  authSubject = new BehaviorSubject(false);
  private token:string;
  constructor(private httpClient: HttpClient) { }

  /*Register Method*/
  register(user:UserI):Observable<JwtResponseI>{
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`,user) 
      .pipe(tap(
      (res:JwtResponseI) => { 
        if(res){
          this.saveToken(res.dataUser.accessToken,res.dataUser.expiresIn)
        }
      }

    ))
  }
 
  /*Login Method*/
  login(user:UserI):Observable<any>{
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/login`,user)
      .pipe(tap(
        (res:any) => {
          if(res){
            this.saveToken(res.dataUser.accessToken,res.dataUser.expiresIn)
          }
        }

      ))
  }

  /*lOGOUT*/
  logout(){
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  /*Save Token*/
  private saveToken(token:string,expiresIn:string):void{
    localStorage.setItem("ACCESS_TOKEN",token);
    localStorage.setItem("EXPIRES_IN",expiresIn);
    this.token = token;
  }

  /*Get Token*/
  private getToken():string{
    if(!this.token){
      this.token = localStorage.getItem("ACCES_TOKEN");
    }
    return this.token;
  }

  recoverAccount(email:string):Observable<any>{
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/recover`,email)
      .pipe(tap(
        (res:any) => {
          if(res){
            
          }
        }

      ))
  }


}
