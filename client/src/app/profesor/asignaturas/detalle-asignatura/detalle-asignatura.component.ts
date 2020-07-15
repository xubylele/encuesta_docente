import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfesorService } from 'src/app/services/profesor.service';
import * as Chart from 'chart.js';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.component.html',
  styleUrls: ['./detalle-asignatura.component.scss']
})
export class DetalleAsignaturaComponent implements OnInit {
  dataCourse:Array<any>
  nameC:string
  siglaC:string

  constructor(private ruta:ActivatedRoute,private profeSrv:ProfesorService,private spinSrv:NgxSpinnerService,) { }

  ngOnInit(): void {
    this.nameC = this.ruta.snapshot.params.nameC
    this.siglaC = this.ruta.snapshot.params.siglaC
    this.spinSrv.show()
    this.profeSrv.getDataCourse(this.ruta.snapshot.params.idC).subscribe((dataCourse)  =>{
      this.spinSrv.hide()
      this.dataCourse = dataCourse
      console.log(this.dataCourse)
    })

  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Uso del Aula Virtual", "Contenido del Curso", "Actitud", "Responsabilidad", "Metodologia de Enseñanza"],
    datasets: [{
      label: this.nameC.concat('\n',this.siglaC),
      data: [3.3, 3.7, 2.8, 2.6, 3.1],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: false,
    scales: {
      xAxes: [{
        ticks: {
          maxRotation: 90,
          minRotation: 80
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});



  }


   
}
