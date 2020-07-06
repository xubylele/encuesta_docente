import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authSrv:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authSrv.logout()
    this.router.navigate(["/auth/login"])  
  }

}
