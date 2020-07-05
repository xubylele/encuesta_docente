import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverAccountComponent } from './recover-account/recover-account.component';
import { EncuestaComponent } from '../alumno/encuesta/encuesta.component';
import { GuardGuard } from './guards/guard.guard';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';



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
        path: '/auth/forgot_password/:token',component:ForgetPassComponent,
    }
    
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
