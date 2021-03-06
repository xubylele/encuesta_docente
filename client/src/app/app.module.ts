import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './profesor/header/header.component';
import { SidebarComponent } from './profesor/sidebar/sidebar.component';
import { AsignaturasComponent } from './profesor/asignaturas/asignaturas.component';
import { ResumenActualComponent } from './profesor/resumen-actual/resumen-actual.component';
import { EvaluacionesAnterioresComponent } from './profesor/evaluaciones-anteriores/evaluaciones-anteriores.component';

import { RecomendacionesComponent } from './profesor/recomendaciones/recomendaciones.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EncuestaService } from './services/encuesta.service';
import { GuardGuard } from './auth/guards/guard.guard';
import { EncuestaComponent } from './alumno/encuesta/encuesta.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from "ngx-spinner";
import { DetalleEncuestaAsgComponent } from './profesor/asignaturas/detalle-encuesta-asg/detalle-encuesta-asg.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    AsignaturasComponent,
    ResumenActualComponent,
    EvaluacionesAnterioresComponent,
    RecomendacionesComponent,
    EncuestaComponent,
    DetalleEncuestaAsgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule


  ],
  providers: [
    EncuestaService,
    GuardGuard,
    NgxSpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
