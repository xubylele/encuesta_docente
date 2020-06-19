import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fondoActive(event){
    console.log(event);
    event.srcElement.style.backgroundColor = "#EEEFF0";
  }

  fondoDisable(event){
    event.srcElement.style.backgroundColor = "#FFFFFF";
  }

}
