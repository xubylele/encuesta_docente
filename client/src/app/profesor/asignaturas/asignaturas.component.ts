import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.scss']
})
export class AsignaturasComponent implements OnInit {

  courseList: Array<any>;
  courses:any

  constructor(private profeSrv:ProfesorService,private router:Router) { }

  ngOnInit(): void {
    this.profeSrv.getCourses().subscribe((coursesApi)  =>{
      this.courses = coursesApi
      console.log(this.courses)
    })
  }

  goToDetailEF(course:any){
    this.router.navigate(["/auth/profe/asignaturas/detalle"])
  }


}
