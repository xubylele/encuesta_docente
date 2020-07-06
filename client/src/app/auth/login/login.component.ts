import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from './../../models/user'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  infPath:string = "./assets/logo_escuela.png";
  pucvPath:string = "./assets/pucv.png";
  fondoPath:string = "./assets/back-login.png";

  formLoginPage:FormGroup;
  userLoged:UserI
  

  constructor(private formBuilder: FormBuilder, 
              private http:HttpClient,
              private authService: AuthService,
              private router:Router
  ) { }

  ngOnInit(): void { 
    this.createForm();
  }

  login(){
    this.authService.login(this.formLoginPage.value).subscribe(res =>{
      if(res.type === 'Alumno'){
        this.router.navigate(["/auth/encuesta"])
      }
      if(res.type === 'Profesor'){
        this.router.navigate(["/auth/profe"])
      }
    });
  }


  createForm(){
    this.formLoginPage = this.formBuilder.group({
      email: ['',Validators.compose([
        Validators.required,Validators.email
      ])],
      password: ['',Validators.compose([
        Validators.required,Validators.minLength(5)
      ])]
    })
  }

  toRecoverAccount(){
    this.router.navigateByUrl('http://localhost:4200/auth/recuperar')
  }
}
