import { Component, OnInit } from '@angular/core';
import { ProfesorService } from './../../services/profesor.service';
import * as Chart from 'chart.js';

interface AverageCourse{

}

@Component({
  selector: 'app-resumen-actual',
  templateUrl: './resumen-actual.component.html',
  styleUrls: ['./resumen-actual.component.scss']
})
export class ResumenActualComponent implements OnInit {

  constructor(private profeSrv:ProfesorService) { }

  canvas: any;
  ctx: any;
  resumeChartLabels: any;
  resumeChartData: any;
  comparationCourseChartData_1:any;
  comparationCourseChartLabels_1:any;
  comparationCourseChartData_2:any;
  comparationCourseChartLabels_2:any;
  resData:Array<any>;
  courses:any;

  ngOnInit(): void {
    this.profeSrv.getAveragesPoll().subscribe((coursesApi)  =>{
      console.log(coursesApi.promedio)
      this.resData = coursesApi.promedio
      this.initResumeGraph()
    })
    
    this.profeSrv.getCourses().subscribe((courseApi) =>{
      this.courses =courseApi;
      console.log(this.courses);
    })
    
  }

  initResumeGraph(){
    this.setResumeData();                                                 // SETEAMOS LA DATA
    this.canvas = document.getElementById('resumeChart');           // OBTENEMOS EL ELEMENTO POR ID
    this.ctx = this.canvas.getContext('2d');                        // LE DAMOS CONTEXTO DE 2 DIMENSIONES
    let resumeChart = new Chart(this.ctx, {                         // CREAMOS EL CHART             
      type: 'polarArea',                                            // LE ASIGNAMOS EL TIPO
      data: {                                                       // SETEAMOS LA DATA DEL CHART
          labels: this.resumeChartLabels,                                 // ASIGNAMOS LOS LABELS A LOS GLOBALES
          datasets: [{                                              // DECLARAMOS EL DATA SET
              data: this.resumeChartData,                                 // ASIGNAMOS LA DATA A LA GLOBAL
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

  initComparationGraph(){
    this.setComparationData();                                                 // SETEAMOS LA DATA
    this.canvas = document.getElementById('comparationChart');           // OBTENEMOS EL ELEMENTO POR ID
    this.ctx = this.canvas.getContext('2d');                        // LE DAMOS CONTEXTO DE 2 DIMENSIONES
    let comparationChart = new Chart(this.ctx, {                         // CREAMOS EL CHART             
      type: 'bar',                                            // LE ASIGNAMOS EL TIPO
      data: {                                                       // SETEAMOS LA DATA DEL CHART
          labels: this.resumeChartLabels,                                 // ASIGNAMOS LOS LABELS A LOS GLOBALES
          datasets: [{
                                         // DECLARAMOS EL DATA SET
              data: this.resumeChartData,                                 // ASIGNAMOS LA DATA A LA GLOBAL
              backgroundColor: ["rgba(255, 99, 132, 0.8)",          // COLOR LABEL 1
                                "rgba(75, 192, 192, 0.8)",          // COLOR LABEL 2
                                "rgba(255, 205, 86, 0.8)",          // COLOR LABEL 3
                                "rgba(201, 203, 207, 0.8)",         // COLOR LABEL 3
                                "rgba(54, 162, 235, 0.8)"],         // COLOR LABEL 5
              borderWidth: 1                                        // LE ASIGNAMOS EL ANCHO DEL BORDE
          },
          {                                              // DECLARAMOS EL DATA SET
            data: this.comparationCourseChartData_2,                                 // ASIGNAMOS LA DATA A LA GLOBAL
            backgroundColor: ["rgba(255, 99, 132, 0.8)",          // COLOR LABEL 1
                              "rgba(75, 192, 192, 0.8)",          // COLOR LABEL 2
                              "rgba(255, 205, 86, 0.8)",          // COLOR LABEL 3
                              "rgba(201, 203, 207, 0.8)",         // COLOR LABEL 3
                              "rgba(54, 162, 235, 0.8)"],         // COLOR LABEL 5
            borderWidth: 1                                        // LE ASIGNAMOS EL ANCHO DEL BORDE
        }]
      }
    });
  }


  setResumeData():void{

    let data = [];                                                        // VARIABLE TEMPORAL DATA
    let labels = [];                                                      // VARIABLE TEMPORAL LABELS

    for(let response of this.resData){
      labels.push(response.categoria);
      data.push(response.puntuacion);
    }
    console.log(labels);
    console.log(data);

    this.resumeChartLabels = labels;
    this.resumeChartData = data;
  }

setComparationData():void{

  let data = [];                                                        // VARIABLE TEMPORAL DATA
  let labels = [];                                                      // VARIABLE TEMPORAL LABELS

//  let resData;


  /*for(let response of this.resData){
    labels.push(response.categoria);
    data.push(response.puntuacion);
  }
  console.log(labels);
  console.log(data);
*/
  this.comparationCourseChartLabels_1 = this.resumeChartLabels;
  this.comparationCourseChartData_1 = this.resumeChartData;

  this.comparationCourseChartLabels_2 =this.resumeChartLabels;
  this.comparationCourseChartData_2 =[1.25,3.4,3,2,1.5];

}
}


