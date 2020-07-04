import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { RespuestaI } from './../../models/respuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { sectionList } from './../../models/encuesta'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit {

  encuestaCompleta: any
  encuesta: sectionList
  page:number = 0
  options: Array<any> = [
    { name: 'No Aplica', value: '0'},
    { name: 'Muy Desacuerdo', value: '1'},
    { name: 'Desacuerdo', value: '2'},
    { name: 'De Acuerdo', value: '3'},
    { name: 'Muy De Acuerdo', value: '4'},
  ];

  respuestas:Array<RespuestaI> = new Array<RespuestaI>();

  infoResp:RespuestaI

  profesores = ["Rodolfo Villarroel", "Rafael Mellado", "Pamela Hermosilla"]

  constructor( private EncuestaSrv:EncuestaService,private router:Router) {
  }

  ngOnInit(): void {
    this.EncuestaSrv.getPreguntas().subscribe((encuestaApi)  =>{
      this.encuestaCompleta = encuestaApi
      this.encuesta = this.encuestaCompleta.sectionList[this.page]
      console.log('Se obtuvo la wea de preguntas')
    })
    this.EncuestaSrv.getCoursesAlumno().subscribe((cursosAlumno)  =>{
      console.log(cursosAlumno)
      console.log('Se obtuvo los cursos del weta')
    })
  }

  changeEncuesta(){
    this.page = this.page + 1
    this.encuesta = this.encuestaCompleta.sectionList[this.page]
  }



  actualizarRespuesta(event){
    let respuesta:string = event.target.value;
    let idPregunta:string = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].id;
    let profesor:string = event.target.parentElement.parentElement.children[0].textContent;

    this.createInfoResp(respuesta,idPregunta,profesor)

    if (!this.cambiarRespuesta(respuesta,profesor,idPregunta)){
      this.respuestas.push(this.infoResp)
    }
    console.log(this.respuestas)
  }

  createInfoResp(res:string,id:string,profe:string){
    this.infoResp = {
      profe:profe,
      sections:[{
        section:this.page,
        data:[{
          preg:id,
          idResp:res
        }]
      }]
    }
  }

  /*Restorna TRUE si es que se pudo cambiar la respuesta (verificando que haya una existente)
  Retorna FALSE si no existe una respuesta asociada a la pregunta*/
  cambiarRespuesta(respSel,profe,pregid){
    for(let respuesta of this.respuestas){
      /*Recorrer para ver si existe respuesta y modificarla*/
      if(respuesta.profe === profe){
        for(let sect of respuesta.sections){
          if(sect.section === this.page){
            for(let resps of sect.data){
              if(resps.preg === pregid){
                resps.idResp = respSel
                return true
              }
            }
            /*Si no encuentra ID de pregunta, añadir respuesta a data*/
            sect.data.push({preg:pregid,idResp:respSel})
            console.log(respuesta)
            return true
          }
        }

      }
    }
    return false
  }  

}
