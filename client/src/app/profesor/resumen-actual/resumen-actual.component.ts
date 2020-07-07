import { Component, OnInit } from '@angular/core';
import { ProfesorService } from './../../services/profesor.service'

@Component({
  selector: 'app-resumen-actual',
  templateUrl: './resumen-actual.component.html',
  styleUrls: ['./resumen-actual.component.scss']
})
export class ResumenActualComponent implements OnInit {

  constructor(private profeService:ProfesorService) { }

  ngOnInit(): void {
  }

}
