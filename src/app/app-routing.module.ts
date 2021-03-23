import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/common/notfound/notfound.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noauth.guard';
const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch:'full'},
  { path: 'notFound', component: NotfoundComponent },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
  { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule), canActivate: [NoAuthGuard] },
  { path: 'register', loadChildren: () => import('./components/auth/register/register.module').then(m => m.RegisterModule), canActivate: [NoAuthGuard] },
  {path: '**', redirectTo: '/notFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
