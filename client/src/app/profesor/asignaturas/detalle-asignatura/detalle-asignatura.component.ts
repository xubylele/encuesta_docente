import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.component.html',
  styleUrls: ['./detalle-asignatura.component.scss']
})
export class DetalleAsignaturaComponent implements OnInit {
  dataCourse:Array<any>

  constructor(private ruta:ActivatedRoute,private profeSrv:ProfesorService) { }

  ngOnInit(): void {
    this.profeSrv.getDataCourse(this.ruta.snapshot.params.idC).subscribe((dataCourse)  =>{
      this.dataCourse = dataCourse
      console.log(this.dataCourse)
    })
  }

}
