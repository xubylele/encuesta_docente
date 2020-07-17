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
  topBadges:any
  respvsmat:any
  percentrvsm:any
  dataCourse:Array<any>
  nameC:string
  siglaC:string
  idC:string
  dataAverages:any
  comments:any

  constructor(private ruta:ActivatedRoute,private profeSrv:ProfesorService,private spinSrv:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinSrv.show()
    this.nameC = this.ruta.snapshot.params.nameC 
    this.siglaC = this.ruta.snapshot.params.siglaC
    this.idC = this.ruta.snapshot.params.idC
    
    this.profeSrv.getAveragesCourse(this.ruta.snapshot.params.idC).subscribe((averageCourse)  =>{
      this.dataCourse = averageCourse.promedio
      console.log(this.dataCourse)
      this.setResumeData()
      this.initGraph()
      this.spinSrv.hide()
    })
    
    this.profeSrv.getInscribedVsResp(this.ruta.snapshot.params.idC).subscribe((respvsmat)  =>{
      this.respvsmat = respvsmat
      this.percentrvsm = (100 * respvsmat.answers) / respvsmat.inscribed
      console.log(respvsmat)
    })

    this.profeSrv.get5topBadges(this.ruta.snapshot.params.idC).subscribe((topbadges)  =>{
      this.topBadges = topbadges.top5
      console.log("insignias")
      console.log(topbadges.top5)
    })

    this.profeSrv.getComments(this.ruta.snapshot.params.idC).subscribe((comments) => {
      this.comments = comments.comments
      console.log(this.comments)
    })
  }

  initGraph(){
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Uso del Aula Virtual", "Contenido del Curso", "Actitud", "Responsabilidad", "Metodologia de Enseñanza"],
      datasets: [{
        label: this.nameC.concat('\n',this.siglaC),
        data: this.dataAverages,
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
            minRotation: 80,

          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            suggestedMax: 4
          }
        }]
      }
    }
  });
  }




  setResumeData():void{

    let data = [];                                                        // VARIABLE TEMPORAL DATA
    let labels = [];                                                      // VARIABLE TEMPORAL LABELS

    for(let response of this.dataCourse){
      labels.push(response.categoria);
      data.push(Number(response.puntuacion));
    }

    this.dataAverages = data;
    //sthis.resumeChartData = data;
  }


   
}
