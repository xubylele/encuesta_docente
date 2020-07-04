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
import { EncuestaService } from './services/encuesta.service';
import { GuardGuard } from './auth/guards/guard.guard';



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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    EncuestaService,
    GuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
