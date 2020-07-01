import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-encuesta5',
  templateUrl: './encuesta5.component.html',
  styleUrls: ['./encuesta5.component.scss']
})
export class Encuesta5Component implements OnInit {

  qSect5 = {title:"METODOLOGÍA DE ENSEÑANZA",
            questions:["1.- El docente enseña de manera acorde a mi forma de aprendizaje",
                      "2.- El docente posee una metodología de enseñanza adecuada para comprender el contenido del curso",
                      "3.- El docente utiliza diferentes medios tecnológicos que complementen su enseñanza"
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
