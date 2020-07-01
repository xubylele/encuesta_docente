import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-encuesta3',
  templateUrl: './encuesta3.component.html',
  styleUrls: ['./encuesta3.component.scss']
})
export class Encuesta3Component implements OnInit {

  qSect3 = {title:"ACTITUD",
            questions:["1.- El docente se muestra dispuesto a resolver todas las dudas de los alumnos",
                      "2.- El docente se muestra interesado en el aprendizaje de sus alumnos",
                      "3.- El docente mantiene un trato cordial con los alumnos"
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
