import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {

  token:string
  infPath:string = "./assets/logo_escuela.png";
  pucvPath:string = "./assets/pucv.png";
  fondoPath:string = "./assets/back-login.png";

  formSetPass:FormGroup;
  

  constructor(private formBuilder: FormBuilder, 
              private http:HttpClient,
              private authService: AuthService,
              private router:Router,
              private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')
    this.createForm();
  }

  createForm(){
    this.formSetPass = this.formBuilder.group({
      pass1: ['',Validators.required],
      pass2: ['',Validators.required],
    })
  }

  sendNewPass(){
    console.log(this.formSetPass.value.pass1)
    this.authService.sendNewPass(this.formSetPass.value.pass1,this.token).subscribe(res =>{
      window.confirm(res)
    });
  }
}
