import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterStudentsPageComponent } from './pages/register-students-page/register-students-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { RegisterSubjectPageComponent } from './pages/register-subject-page/register-subject-page.component';
import { AssistancePageComponent } from './pages/assistance-page/assistance-page.component';
import { AssistanceViewPageComponent } from './pages/assistance-view-page/assistance-view-page.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  

  
  { path: 'home',component:HomeComponent},
  { path: 'register',component: RegisterStudentsPageComponent},
  { path: 'register-subject',component: RegisterSubjectPageComponent},
  { path: 'assistance',component:AssistancePageComponent},
  { path: 'view-assistance',component:AssistanceViewPageComponent},
  { path: 'modal',component:ModalComponent},
  { path: '**', redirectTo: 'login' }, 
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
