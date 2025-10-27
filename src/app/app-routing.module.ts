import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskComponent } from './task/task.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // page par défaut
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskComponent, canActivate: [authGuard] }, // protégé par AuthGuard
  { path: '**', redirectTo: '/login' } // page 404 redirige vers login
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
