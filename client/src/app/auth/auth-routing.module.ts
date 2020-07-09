import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverAccountComponent } from './recover-account/recover-account.component';
import { EncuestaComponent } from '../alumno/encuesta/encuesta.component';
import { GuardGuard } from './guards/guard.guard';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { SidebarComponent } from '../profesor/sidebar/sidebar.component';
import { InsigniasComponent } from '../profesor/insignias/insignias.component';
import { AsignaturasComponent } from '../profesor/asignaturas/asignaturas.component';
import { RecomendacionesComponent } from '../profesor/recomendaciones/recomendaciones.component';
import { EvaluacionesAnterioresComponent } from '../profesor/evaluaciones-anteriores/evaluaciones-anteriores.component';
import { ResumenActualComponent } from '../profesor/resumen-actual/resumen-actual.component';
import { DetalleAsignaturaComponent } from '../profesor/asignaturas/detalle-asignatura/detalle-asignatura.component';



const routes: Routes = [
    /*{
        path: 'register', component:RegisterComponent,
    },*/
    {
        path: 'login', component:LoginComponent,
    },
    {
        path: 'recuperar', component:RecoverAccountComponent,
    },
    {
        path: 'encuesta',component:EncuestaComponent, canActivate:[GuardGuard],
    },
    {
        path: 'forgot_password/:token',component:ForgetPassComponent,
    },
    {
        path: 'profe',
        component:SidebarComponent,
        canActivate:[GuardGuard],
        children:[
            {
                path:'insignias',component:InsigniasComponent
            },
            {
                path:'asignaturas',component:AsignaturasComponent,
            },
            {
                path:'recomendaciones',component:RecomendacionesComponent
            },
            {
                path:'eval-ant',component:EvaluacionesAnterioresComponent
            },
            {
                path:'home',component:ResumenActualComponent
            },
            {
                path:'asignaturas/detalle/:idC',component:DetalleAsignaturaComponent
            },
        ]
    },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
