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
    RecomendacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
