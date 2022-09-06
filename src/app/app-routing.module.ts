import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterStudentsPageComponent } from './pages/register-students-page/register-students-page.component';
import { ModalComponent } from './components/modal/modal.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  

  
  { path: 'home',component:HomeComponent},
  { path: 'register',component: RegisterStudentsPageComponent},
  { path: 'modal',component:ModalComponent},
  { path: '**', redirectTo: 'login' }, 
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
