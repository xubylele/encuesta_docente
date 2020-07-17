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
  resumeChartLabels: any;
  resumeChartData: any;
  comparationCourseID_1:any;
  comparationCourseID_2:any;
  comparationCoursesName:Array<any>;
  comparationCourseChartData_1:any;
  comparationCourseChartLabels_1:any;
  comparationCourseChartData_2:any;
  comparationCourseChartLabels_2:any;

  resData:Array<any>;
  courses:any;

  ngOnInit(): void {
    this.spinSrv.show()
    this.profeSrv.getAveragesPoll().subscribe((coursesApi)  =>{
      this.resData = coursesApi.promedio
      this.initResumeGraph()
      this.spinSrv.hide()
    })
    
    this.profeSrv.getCourses().subscribe((courseApi) =>{
      this.courses =courseApi;
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

  initComparationGraph(){                                             // SETEAMOS LA DATA
    this.canvas = document.getElementById('comparationChart');           // OBTENEMOS EL ELEMENTO POR ID
    this.ctx = this.canvas.getContext('2d');                        // LE DAMOS CONTEXTO DE 2 DIMENSIONES
    console.log("init");


    let comparationChart = new Chart(this.ctx, {                         // CREAMOS EL CHART             
      type: 'bar',                                            // LE ASIGNAMOS EL TIPO
      data: {                                                       // SETEAMOS LA DATA DEL CHART
          labels: this.comparationCourseChartLabels_1,                                 // ASIGNAMOS LOS LABELS A LOS GLOBALES
          datasets: [{
                                         // DECLARAMOS EL DATA SET
              data: this.comparationCourseChartData_1,                                 // ASIGNAMOS LA DATA A LA GLOBAL
              label:this.getCourseName(this.comparationCourseID_1),
              backgroundColor: ["rgba(255, 99, 132, 0.8)",          // COLOR LABEL 1
                                "rgba(75, 192, 192, 0.8)",          // COLOR LABEL 2
                                "rgba(255, 205, 86, 0.8)",          // COLOR LABEL 3
                                "rgba(201, 203, 207, 0.8)",         // COLOR LABEL 3
                                "rgba(54, 162, 235, 0.8)"],         // COLOR LABEL 5
              borderWidth: 1                                        // LE ASIGNAMOS EL ANCHO DEL BORDE
          },
          {                                              // DECLARAMOS EL DATA SET
            data: this.comparationCourseChartData_2,                                 // ASIGNAMOS LA DATA A LA GLOBAL
            label:this.getCourseName(this.comparationCourseID_2),
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

    this.resumeChartLabels = labels;
    this.resumeChartData = data;
  }


setComparationCourse_1(event){
  this.comparationCourseID_1 = event.target.value;
  //this.comparationCoursesName[0] = evet


}
setComparationCourse_2(event){
  this.comparationCourseID_2 = event.target.value;

} 

getCoursesAverage():void {

let resData:Array<any>;
let resData_2:Array<any>;
let labels = [];
let data = [];
let labels_2 =[];
let data_2=[];
this.profeSrv.getAveragesCourse(this.comparationCourseID_1).subscribe((coursesApi)  =>{
    resData = coursesApi.promedio;
    for(let response of resData){
      labels.push(response.categoria);
      data.push(response.puntuacion);
    }
    this.comparationCourseChartData_1 = data;
    this.comparationCourseChartLabels_1 = labels;
  })

  this.profeSrv.getAveragesCourse(this.comparationCourseID_2).subscribe((coursesApi)  =>{
    
    resData_2 = coursesApi.promedio;
    for(let response of resData_2){
      labels_2.push(response.categoria);
      data_2.push(response.puntuacion);
    }
    this.comparationCourseChartData_2 = data_2;
    this.comparationCourseChartLabels_2 = labels_2;
    this.initComparationGraph();  
  })
}

getCourseName(courseID:string):string{
  for(let course of this.courses){
    if(course._id == courseID){
      return course.name;
    }
  }
}


}