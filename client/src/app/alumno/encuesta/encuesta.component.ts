import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { RespuestaI } from './../../models/respuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { sectionList } from './../../models/encuesta'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ProfesCursosI } from './../../models/profes-cursos';
import { ProfCursosApi } from 'src/app/models/dataPrCu';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit {
  badges:Array<any>
  profesAndC:Array<any>
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

  constructor( private EncuestaSrv:EncuestaService,private router:Router,private authSrv:AuthService) {
  }

  ngOnInit(): void {
    this.EncuestaSrv.getPreguntas().subscribe((encuestaApi)  =>{
      this.encuestaCompleta = encuestaApi
      this.encuesta = this.encuestaCompleta.sectionList[this.page]
      console.log('Se obtuvo la wea de preguntas')
    })
    this.EncuestaSrv.getCoursesAlumno().subscribe((cursosAlumno)  =>{
      this.profesAndC = cursosAlumno.courses
    })
    this.EncuestaSrv.getBadges().subscribe((badges) =>{
      this.badges = badges
      console.log(this.badges)
    } )
  }

  changeEncuesta(){
    this.page = this.page + 1
    this.encuesta = this.encuestaCompleta.sectionList[this.page]
  }

  actualizarRespuesta(event){
    var respuesta:string = event.target.value;
    var idPregunta:string = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].id;
    var idProfesor:string = event.target.parentElement.parentElement.children[0].children[0].id;
    var idCurso:string = event.target.parentElement.parentElement.children[1].id;
 
    this.createInfoResp(respuesta,idPregunta,idProfesor,idCurso)

    if (!this.cambiarRespuesta(respuesta,idPregunta,idProfesor,idCurso)){
      this.respuestas.push(this.infoResp)
    }
    console.log(this.respuestas)
  }


  createInfoResp(idRes:string,idPregunta:string,idProfe:string,idCurso:string){
    this.infoResp = {
      idCurso:idCurso,
      profes:[{
        id:idProfe,
        data:[{
          idPreg:idPregunta,
          idResp:idRes
        }],
        insignias:[{
          id:null
        }]
      }]
    }
  }

  //Restorna TRUE si es que se pudo cambiar la respuesta (verificando que haya una existente)
  //Retorna FALSE si no existe una respuesta asociada a la pregunta
  
  cambiarRespuesta(idRes:string,idPregunta:string,profeid:string,idCurso:string){
    for(let respuesta of this.respuestas){
      //Recorrer para ver si existe respuesta y modificarla
      if(respuesta.idCurso === idCurso){
        for(let profe of respuesta.profes){
          var id
          console.log(profe.id)
          id = profe.id
          if(id === profeid){
            for(let data of profe.data){
              if(data.idPreg == idPregunta){
                data.idResp = idRes
                return true
              }
            }
            var data = this.generateData(idPregunta,idRes)
            profe.data.push(data)
            return true
          }
        }
      }

    }
    return false
  } 
  
  generateData(idPregunta,idRes){
    var data = {
      idPreg:idPregunta,
      idResp:idRes
    }
    return data
  }

  sendEncuesta(){
    this.EncuestaSrv.postEncuesta(this.respuestas).subscribe(res =>{
      if (window.confirm("Encuesta Enviada!")){
        this.authSrv.logout()
        this.router.navigate(["/auth/login"])
        return
      }
      this.authSrv.logout()
      this.router.navigate(["/auth/login"])  
    });
  }
}
