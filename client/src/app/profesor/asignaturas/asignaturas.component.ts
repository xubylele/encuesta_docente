import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.scss']
})
export class AsignaturasComponent implements OnInit {

  courseList: Array<any>;
  courses:any

  constructor(private profeSrv:ProfesorService) { }



  ngOnInit(): void {
    this.profeSrv.getCourses().subscribe((coursesApi)  =>{
      this.courses = coursesApi
    })
  }

  

}
