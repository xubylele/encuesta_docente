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
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from "ngx-spinner";

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
    NgxSpinnerModule
  ],
  providers:[
    AuthService,
    GuardGuard,
    NgxSpinnerService
  ]
})
export class AuthModule { }
