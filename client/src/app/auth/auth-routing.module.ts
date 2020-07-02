import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverAccountComponent } from './recover-account/recover-account.component';


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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
