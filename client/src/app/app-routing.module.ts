import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',redirectTo:'/auth/login', pathMatch:'full'
  },
  {
    path: 'auth', loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'encuesta',redirectTo:'/encuesta',pathMatch:'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
