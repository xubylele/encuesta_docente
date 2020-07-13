import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';

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
              private router:Router,
              private spinSrv:NgxSpinnerService,
              
  ) { }

  ngOnInit(): void { 
    this.createForm();
  }

  createForm(){
    this.formRecover = this.formBuilder.group({
      email: ['',Validators.compose([
        Validators.required,Validators.email
      ])
        
      ],
    })
  }

  recoverAccount(){
    this.spinSrv.show()
    this.authService.recoverAccount(this.formRecover.value).subscribe(res =>{
      this.spinSrv.hide()
      Swal.fire(
        'Exitoso',
        res.messge,
        'success'
      ).then(result =>{
        this.router.navigate(["/auth/login"])
      })
    },(err) => 
      Swal.fire({
        icon: 'error',
        title: 'Verifique sus datos',
        text: err.error.error,
    }))
  }
  
}
