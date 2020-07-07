import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.scss']
})
export class AsignaturasComponent implements OnInit {

  courseList: Array<any>;

  constructor() { }



  ngOnInit(): void {
    this.courseList = [{name:"first",acronym:"INF-12", participantsCount: 30},
                       {name:"second",acronym:"INF-13", participantsCount: 20},
                       {name:"thirth",acronym:"INF-14", participantsCount: 220},
                       {name:"fourty",acronym:"INF-15", participantsCount: 35}];
  }

}
