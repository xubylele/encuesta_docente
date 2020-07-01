import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-encuesta4',
  templateUrl: './encuesta4.component.html',
  styleUrls: ['./encuesta4.component.scss']
})
export class Encuesta4Component implements OnInit {

  qSect4 = {title:"RESPONSABILIDAD",
            questions:["1.- El docente se presenta puntualmente a cada clase.",
                      "2.- El docente entrega material de estudio y resultados de evaluaciones en la fecha indicada previamente",
                      "3.- El docente cumple con acuerdos previamente dispuestos en conjunto con el grupo curso"
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
