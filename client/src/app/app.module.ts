import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './profesor/header/header.component';
import { SidebarComponent } from './profesor/sidebar/sidebar.component';
import { InicioComponent } from './profesor/inicio/inicio.component';
import { AsignaturasComponent } from './profesor/asignaturas/asignaturas.component';
import { ResumenActualComponent } from './profesor/resumen-actual/resumen-actual.component';
import { EvaluacionesAnterioresComponent } from './profesor/evaluaciones-anteriores/evaluaciones-anteriores.component';
import { InsigniasComponent } from './profesor/insignias/insignias.component';
import { RecomendacionesComponent } from './profesor/recomendaciones/recomendaciones.component';
import { HttpClientModule } from '@angular/common/http';
import { EncuestaComponent } from './alumno/encuesta/encuesta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Encuesta2Component } from './alumno/encuesta2/encuesta2.component';
import { Encuesta3Component } from './alumno/encuesta3/encuesta3.component';
import { Encuesta4Component } from './alumno/encuesta4/encuesta4.component';
import { Encuesta5Component } from './alumno/encuesta5/encuesta5.component';
import { Encuesta6Component } from './alumno/encuesta6/encuesta6.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    InicioComponent,
    AsignaturasComponent,
    ResumenActualComponent,
    EvaluacionesAnterioresComponent,
    InsigniasComponent,
    RecomendacionesComponent,
    EncuestaComponent,
    Encuesta2Component,
    Encuesta3Component,
    Encuesta4Component,
    Encuesta5Component,
    Encuesta6Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
