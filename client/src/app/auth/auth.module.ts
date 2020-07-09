import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverAccountComponent } from './recover-account/recover-account.component';
import { GuardGuard } from './guards/guard.guard';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { InsigniasComponent } from '../profesor/insignias/insignias.component';
import { DetalleAsignaturaComponent } from '../profesor/asignaturas/detalle-asignatura/detalle-asignatura.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    RecoverAccountComponent,
    ForgetPassComponent,
    InsigniasComponent,
    DetalleAsignaturaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers:[
    AuthService,
    GuardGuard
  ]
})
export class AuthModule { }
