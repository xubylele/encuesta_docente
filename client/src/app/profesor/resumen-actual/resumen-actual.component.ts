import { Component, OnInit } from '@angular/core';
import { ProfesorService } from './../../services/profesor.service';
import * as Chart from 'chart.js';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';

interface AverageCourse{

}

@Component({
  selector: 'app-resumen-actual',
  templateUrl: './resumen-actual.component.html',
  styleUrls: ['./resumen-actual.component.scss']
})
export class ResumenActualComponent implements OnInit {

  constructor(private profeSrv:ProfesorService,
              private spinSrv:NgxSpinnerService,
    ) { }

  canvas: any;
  ctx: any;
  chartLabels: any;
  chartData: any;
  resData:Array<any>;

  ngOnInit(): void {
    this.spinSrv.show()
    this.profeSrv.getAveragesPoll().subscribe((coursesApi)  =>{
      console.log(coursesApi.promedio)
      this.resData = coursesApi.promedio
      this.initGraph()
      this.spinSrv.hide()
    })  
  }

  initGraph(){
    this.setData();                                                 // SETEAMOS LA DATA
    this.canvas = document.getElementById('resumeChart');           // OBTENEMOS EL ELEMENTO POR ID
    this.ctx = this.canvas.getContext('2d');                        // LE DAMOS CONTEXTO DE 2 DIMENSIONES
    let resumeChart = new Chart(this.ctx, {                         // CREAMOS EL CHART             
      type: 'polarArea',                                            // LE ASIGNAMOS EL TIPO
      data: {                                                       // SETEAMOS LA DATA DEL CHART
          labels: this.chartLabels,                                 // ASIGNAMOS LOS LABELS A LOS GLOBALES
          datasets: [{                                              // DECLARAMOS EL DATA SET
              data: this.chartData,                                 // ASIGNAMOS LA DATA A LA GLOBAL
              backgroundColor: ["rgba(255, 99, 132, 0.8)",          // COLOR LABEL 1
                                "rgba(75, 192, 192, 0.8)",          // COLOR LABEL 2
                                "rgba(255, 205, 86, 0.8)",          // COLOR LABEL 3
                                "rgba(201, 203, 207, 0.8)",         // COLOR LABEL 3
                                "rgba(54, 162, 235, 0.8)"],         // COLOR LABEL 5
              borderWidth: 1                                        // LE ASIGNAMOS EL ANCHO DEL BORDE
          }]
      },
      options: {                                                    // SETEAMOS LAS OPCIONES
        scale: {                                                    // DECLARAMOS LA ESCALA
          ticks: {                          
              min: 0,                                               // TIENE MINIMO 0
              max: 4                                                // MAXIMO 4
          }
        },
        legend: {
            display: true                                           // ASIGNAMOS TRUE PARA QUE SE VEAN LAS LABELS 
        },
        responsive: false,                                          // TRABAJAMOS SIN RESPONSIVE
        display:true                                                // LE DECIMOS QUE SI SE MUESTRE
      }
    });
  }


  setData():void{

    let data = [];                                                        // VARIABLE TEMPORAL DATA
    let labels = [];                                                      // VARIABLE TEMPORAL LABELS

    for(let response of this.resData){
      labels.push(response.categoria);
      data.push(response.puntuacion);
    }
    console.log(labels);
    console.log(data);

    this.chartLabels = labels;
    this.chartData = data;
   
/* DATA PLANA 
    const data = [3.4 ,2.8, 3.1, 3.0, 2.9]; 
    const labels = ["Uso Del Aula Virtual", "Contenido Del Curso", "Actitud", "Responsabilidad", "Metodología De La Enseñanza"];
    if(data!=null && labels != null){
      this.chartData = data;
      this.chartLabels = labels;
    } 
    else{
      this.chartData = null;
      this.chartLabels = null;
    }
    */
  }
}
