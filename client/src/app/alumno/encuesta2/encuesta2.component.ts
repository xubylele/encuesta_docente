import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-encuesta2',
  templateUrl: './encuesta2.component.html',
  styleUrls: ['./encuesta2.component.scss']
})
export class Encuesta2Component implements OnInit {

  qSect2 = {title:"CONTENIDO DEL CURSO",
            questions:["1.- El contenido del curso corresponde al declarado en el programa de la asignatura.",
                      "2.- El contenido del curso es vigente con respecto a la actual realidad laboral.",
                      "3.- El docente informa adecuadamente al inicio del curso los contenidos a revisar durante el transcurso de este"
  ],}

  options: Array<any> = [
    { name: 'Muy Desacuerdo', value: '0' },
    { name: 'Desacuerdo', value: '1' },
    { name: 'Normal', value: '2' },
    { name: 'De Acuerdo', value: '3' },
    { name: 'Muy De Acuerdo', value: '4' },
    { name: 'No Aplica', value: '5' }
  ];

  poll: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
