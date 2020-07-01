import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegisterPage:FormGroup
  infPath:string = "./assets/logo_escuela.png";
  pucvPath:string = "./assets/pucv.png";
  fondoPath:string = "./assets/back-login.png";

  constructor(private formBuilder: FormBuilder, 
    private http:HttpClient,
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  register(){
    this.authService.register(this.formRegisterPage.value).subscribe(res =>{
      console.log("Registro")
    });
  }

  createForm(){
    this.formRegisterPage = this.formBuilder.group({
      names: ['',Validators.compose([
        Validators.required
      ])],
      last_names: ['',Validators.compose([
        Validators.required
      ])],
      email: ['',Validators.compose([
        Validators.required,Validators.email
      ])],
      password: ['',Validators.compose([
        Validators.required,Validators.minLength(5)
      ])],
      type: ['',Validators.compose([
        Validators.required
      ])],
    })
  }

}
