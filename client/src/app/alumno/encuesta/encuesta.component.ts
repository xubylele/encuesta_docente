import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { RespuestaI } from './../../models/respuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { sectionList } from './../../models/encuesta'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ProfesCursosI } from './../../models/profes-cursos';
import { ProfCursosApi } from 'src/app/models/dataPrCu';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';


interface ProfeSNid{
  nameP:string,
  idP:string,
  idC:string,
  nameC:string,
}

@Component({ 
  selector: 'app-encuesta', 
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit {
  instPage:boolean = true
  data: any;
  namesProfes:Array<ProfeSNid> = new Array<ProfeSNid>()
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

  classIcons: Array<any> = [
    'far fa-laugh-beam',
    'far fa-clock',
    'fas fa-user-check',
    'fas fa-user-cog',
    'far fa-handshake',
    'far fa-comment-dots',
    'fas fa-book',
    'far fa-meh',
    'fas fa-clock',
    'fas fa-user-minus',
    'far fa-thumbs-down',
    'far fa-frown',
    'fas fa-comment-slash',
    'far fa-times-circle',
  ]

  respuestas:Array<RespuestaI> = new Array<RespuestaI>();

  infoResp:RespuestaI

  constructor( private EncuestaSrv:EncuestaService,
               private router:Router,
               private authSrv:AuthService,
               private spinSrv:NgxSpinnerService,
    ) { }
 
  ngOnInit(): void {
    this.spinSrv.show()
    this.EncuestaSrv.getPreguntas().subscribe((encuestaApi)  =>{
      this.encuestaCompleta = encuestaApi
      this.encuesta = this.encuestaCompleta.sectionList[this.page]
    })
    this.EncuestaSrv.getCoursesAlumno().subscribe((cursosAlumno)  =>{
      this.profesAndC = cursosAlumno.courses
      this.getProfesOfData()
      this.spinSrv.hide()
    })
    this.EncuestaSrv.getBadges().subscribe((badges) =>{
      this.badges = badges
    })
  }

  changeEncuesta(){
    if(this.page < 5 && this.page >= 0){
      if(this.checkAnswerComplete()){
        this.page = this.page + 1
        this.encuesta = this.encuestaCompleta.sectionList[this.page]
        window.scroll(0,0);
      }
      else{
        window.alert('Asegurese de completar la encuesta!')
      }
    }
  }

  changeEncuestaComm(){
    for(let profe of this.namesProfes){
      let id = profe.idP.concat(profe.idC)
      let comment = (<HTMLInputElement>document.getElementById(id)).value
      this.insertCommentOnJson(profe.idP,profe.idC,comment)
    }
    this.page = this.page + 1
    this.encuesta = this.encuestaCompleta.sectionList[this.page]
  }

  insertCommentOnJson(idProfe:string,idCurso:string,comment:string){
    for(let respuesta of this.respuestas){
      if(respuesta.idCurso === idCurso){
        for(let profe of respuesta.profes){
          if(profe.id === idProfe){
            profe.comment = comment
          }  
        }
      }
    }
  }
  
  
  checkAnswerComplete(){
    let cantProfes:number = 0
    let count:number = 0
    let respPorProfe:number = 0
    for(let respuesta of this.respuestas){
        for(let profe of respuesta.profes){
          respPorProfe = profe.data.length
          count = count + respPorProfe
        }
    }
    let cant = (this.namesProfes.length) * 3 * (this.page+1)
    console.log(cant)
    console.log(count)
    if(count == cant){
      return true
    }
    return false
  }

  actualizarRespuesta(event){
    var respuesta:string = event.target.value;
    var idPregunta:string = event.target.id;
    var idProfesor:string = event.target.parentElement.parentElement.children[0].id;
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
          if(profe.id === profeid){
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
        respuesta.profes.push({
          id:profeid,
          data:[{
            idPreg:idPregunta,
            idResp:idRes
          }],
          insignias:[{
            id:''
          }]
        })
        return true
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
    this.spinSrv.show()
    this.EncuestaSrv.postEncuesta(this.respuestas).subscribe(res =>{
      this.spinSrv.hide()
      if (window.confirm("Encuesta Enviada!")){
        this.authSrv.logout()
        this.router.navigate(["/auth/login"])
        return
      }
      this.authSrv.logout()
      this.router.navigate(["/auth/login"])  
    });
  }

  getProfesOfData(){
    for(let data of this.profesAndC){
      console.log(data)
      for(let teacher of data.teachers){
        if((!this.namesProfes.find(function (profe){
          if(profe.idP == teacher._id){
            if(data.course.id == profe.idC){
              return true
            }
            return false
          }
        })
        ))
        {
          this.namesProfes.push({
            nameP:teacher.names,
            idP:teacher._id,
            idC:data.course._id,
            nameC:data.course.acronym
          })
        }  
      }
    
    }
    console.log(this.namesProfes)
  }

  logout(){
    this.authSrv.logout()
    this.router.navigate(["/auth/login"])  
  }

  addBadge(e){
    let idBadge = e.target.value
    let idCurso = e.target.id
    let idProfe = e.target.parentElement.id
    let data = {id:''}
    for(let respuesta of this.respuestas){
      //Recorrer para ver si existe respuesta y modificarla
      if(respuesta.idCurso === idCurso){
        for(let profe of respuesta.profes){
          if(profe.id === idProfe){
            for(let badge of profe.insignias){
              if(badge.id === idBadge){
                let index = profe.insignias.indexOf(badge,0)
                console.log(index)
                profe.insignias.splice(index,1)
                return
              }
              
            }
            data.id = idBadge
            profe.insignias.push(data)
            console.log(this.respuestas)
            return
          }
        }
      }

    }
  }

  comenzarEncuesta(){
    this.instPage = false
  }

}
