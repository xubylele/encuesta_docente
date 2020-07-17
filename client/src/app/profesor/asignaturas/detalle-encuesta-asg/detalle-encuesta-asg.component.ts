import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { ProfesorService } from 'src/app/services/profesor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-encuesta-asg',
  templateUrl: './detalle-encuesta-asg.component.html',
  styleUrls: ['./detalle-encuesta-asg.component.scss']
})
export class DetalleEncuestaAsgComponent implements OnInit {
  dataCourse:any
  percent:string = "10%"

  constructor(private ruta:ActivatedRoute,private profeSrv:ProfesorService,private spinSrv:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinSrv.show()
    this.profeSrv.getDataCourse(this.ruta.snapshot.params.idC).subscribe((dataCourse)  =>{
      this.spinSrv.hide()
      this.dataCourse = dataCourse.sectionResults
      console.log(this.dataCourse)
    })
  }

} 
