import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  infPath:string = "./assets/logo_escuela.png";
  pucvPath:string = "./assets/pucv.png"
  fondoPath:string = "./assets/back-login.png"

  constructor() { }

  ngOnInit(): void {
  }

}
