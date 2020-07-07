import { Component, OnInit } from '@angular/core';
import { ProfesorService } from './../../services/profesor.service'

@Component({
  selector: 'app-resumen-actual',
  templateUrl: './resumen-actual.component.html',
  styleUrls: ['./resumen-actual.component.scss']
})
export class ResumenActualComponent implements OnInit {

  constructor(private profeService:ProfesorService) { }

  canvas:any;
  ctx:any;

  //getData()


  ngOnInit(): void {

    this.canvas = document.getElementById('resumeChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'polarArea',
      ticks:{
          sampleSize: 5,
          max: 5
      },
      data: {
          labels: ["Uso Del Aula Virtual", "Contenido Del Curso", "Actitud", "Responsabilidad", "Metodología De La Enseñanza"],
          datasets: [{
              fill: 2,
              data: [2 ,2, 2, 2, 2],
              backgroundColor: ["rgba(255, 99, 132, 0.8)","rgba(75, 192, 192, 0.8)","rgba(255, 205, 86, 0.8)","rgba(201, 203, 207, 0.8)","rgba(54, 162, 235, 0.8)"  ],
              borderWidth: 1
          }]
      },
      options: {
        scale: {
          ticks: {
              min: 0,
              max: 4
          }
        },
    legend: {
        display: true
    },
        responsive: false,
        display:true
      }
    });
  
  


  }

}
