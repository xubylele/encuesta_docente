import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { RespuestaI } from './../../models/respuesta';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit {
  title:"USO AULA VIRTUAL"
  options: Array<any> = [
    { name: 'Muy Desacuerdo', value: '0' },
    { name: 'Desacuerdo', value: '1' },
    { name: 'Normal', value: '2' },
    { name: 'De Acuerdo', value: '3' },
    { name: 'Muy De Acuerdo', value: '4' },
    { name: 'No Aplica', value: '5' }
  ];

  respuestas:Array<RespuestaI> = new Array<RespuestaI>();

  qSect1: Array<any> = [
    {
      id:'1',
      data: "1.- El docente actualiza frecuentemente el contenido disponible en el aula virtual del curso"
    },
    {
      id:'2',
      data: "2.- El material entregado mediante el aula virtual es apropiado para el desarrollo de la asignatura"
    },
    {
      id:'3',
      data: "3.- El docente mantiene una comunicación continua mediante el aula virtual"
    },
  ]

  infoResp:RespuestaI;

  profesores = ["Rodolfo Villarroel", "Rafael Mellado", "Pamela Hermosilla"]

  constructor() {
  }

  ngOnInit(): void {
  }

  submitForm(event) {
    console.log(this.respuestas)

    /*console.log(event.target.parentElement.parentElement.parentElement.parentElement.children[1].id)
    console.log(event.target.parentElement.parentElement.children[0].children[0].textContent)
    console.log(event.target.value)*/
  }


  addOpt(event){
    
    console.log(this.respuestas)
  }

}
