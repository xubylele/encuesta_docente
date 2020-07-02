import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.scss']
})
export class RecoverAccountComponent implements OnInit {

  infPath:string = "./assets/logo_escuela.png";
  pucvPath:string = "./assets/pucv.png";
  fondoPath:string = "./assets/back-login.png";

  formRecover:FormGroup;
  

  constructor(private formBuilder: FormBuilder, 
              private http:HttpClient,
              private authService: AuthService,
              private router:Router
  ) { }

  ngOnInit(): void { 
    this.createForm();
  }

  createForm(){
    this.formRecover = this.formBuilder.group({
      email: ['',Validators.required],
    })
  }

  recoverAccount(){
    if (window.confirm("'Aceptar' para enviar correo de confirmacion!\nCorrobore su Email")){
      this.authService.login(this.formRecover.value).subscribe(res =>{
      });
    }  
  }

  
}