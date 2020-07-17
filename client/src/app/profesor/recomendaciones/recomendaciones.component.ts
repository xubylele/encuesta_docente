import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.scss']
})
export class RecomendacionesComponent implements OnInit {

  constructor() { }

  carouselActiveItemsLinks = [["https://youtu.be/Xx3AVjuzVdc","Método FLIPPED Classroom (Clase Invertida)","En el siguiente vídeo te explico qué es el método Flipped Classroom y cómo puedes ponerlo en práctica en tu aula. Para ello, te explico las bases de ésta metodología y cuales son los roles del maestro y del alumno."],
                             [ "https://youtu.be/HoZXfZ5J1QI","Cómo usar Kahoot como Docente - Tutorial -","En este video se explicara como usar  Kahoot si eres un Docente que desea usarla pero no sabe cómo."],
                             [ "https://youtu.be/UFZwIEKe-y4","Métodos de enseñanza","En este curso planteamos cuestiones que forman la cultura profesional, que el docente debe tener, y sobre las que debe pensar y tener criterio. Reflexionaremos sobre la esencia de la educación que imparte el profesor, tanto en la etapa previa a la universidad como en la universidad y sobre las competencias que necesita poseer el profesor y cómo puede adquirirlas."]];
  carouselItemsLinks_1 =[["https://youtu.be/oO53ib3b1PM","Cómo PLANIFICAR una Clase con Éxito","En el siguiente vídeo te explico cómo planificar una clase. Teniendo en cuenta la estructura de inicio, desarrollo y cierre, podrás adaptar cualquier tipo de contenido que quieras transmitir a tus alumnos. Es importante que el papel del docente sea el de guía durante todo el proceso y que se use como andamiaje para que los alumnos aprendan mejor."],
                      [ "https://youtu.be/DF5MYnV-Fh4","7 Claves para ENSEÑAR Mejor a tus Alumnos","En este vídeo te presento diferentes situaciones en las que los alumnos aprenden mejor y, con ellas, a cómo crear entornos potentes de aprendizaje en el aula."],
                      [ "https://youtu.be/eWL6oHOZ2zk","Usando Google Meet para mi clase virtual","Uso de google meet para clases virtuales y reuniones de trabajo."]];
  carouselItemsLinks_2 =[["https://youtu.be/9MeBQtBvCCs","Tips para clases virtuales (profesores)",""]];

  carouselDataItemActive= [];
  carouselDataItem_1= [];
  carouselDataItem_2= [];

  ngOnInit(): void {
  this.setCarouselDatas()
  }

setCarouselDatas():void{
  let tempActiveItemData=[];
  let tempItemData_1=[];
  let tempItemData_2=[]


   for(let i = 0 ; i < this.carouselActiveItemsLinks.length; i++){
     tempActiveItemData[i]={thumbnail:this.getThumbnail(this.carouselActiveItemsLinks[i][0]),link:this.carouselActiveItemsLinks[i][0],title:this.carouselActiveItemsLinks[i][1],description:this.carouselActiveItemsLinks[i][2]};
   }
   for(let i = 0 ; i < this.carouselItemsLinks_1.length; i++){
    tempItemData_1[i]={thumbnail:this.getThumbnail(this.carouselItemsLinks_1[i][0]),link:this.carouselItemsLinks_1[i][0],title:this.carouselItemsLinks_1[i][1],description:this.carouselItemsLinks_1[i][2]};
  }
  for(let i = 0 ; i < this.carouselItemsLinks_2.length; i++){
    tempItemData_2[i]={thumbnail:this.getThumbnail(this.carouselItemsLinks_2[i][0]),link:this.carouselItemsLinks_2[i][0],title:this.carouselItemsLinks_2[i][1],description:this.carouselItemsLinks_2[i][2]};
  }

  this.carouselDataItemActive = tempActiveItemData;
  this.carouselDataItem_1 = tempItemData_1;
  this.carouselDataItem_2 = tempItemData_2;

}

getThumbnail(youtubeLink:string){
  var youtube_video_id = youtubeLink.substr(17);                                //  SE SUBSTRAE https://www.youtube.com/watch?v= DEL VIDEO
  var video_thumbnail = 'https://img.youtube.com/vi/'+youtube_video_id+'/0.jpg';// SE LE AGREGA A LA RUTA DE THUMNAILS
  return video_thumbnail;
}


}
