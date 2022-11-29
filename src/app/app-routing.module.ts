import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterStudentsPageComponent } from './pages/register-students-page/register-students-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { RegisterSubjectPageComponent } from './pages/register-subject-page/register-subject-page.component';
import { AssistancePageComponent } from './pages/assistance-page/assistance-page.component';
import { AssistanceViewPageComponent } from './pages/assistance-view-page/assistance-view-page.component';
import { RegisterTeacherPageComponent } from './pages/register-teacher-page/register-teacher-page.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';
import { EnrollPageComponent } from './pages/enroll-page/enroll-page.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate:[LoggedGuard] },
  

  
  { path: 'home',component:HomeComponent,canActivate:[AuthGuard]},
  { path: 'register',component: RegisterStudentsPageComponent,canActivate:[AuthGuard]},
  { path: 'register-subject',component: RegisterSubjectPageComponent,canActivate:[AuthGuard]},
  { path: 'assistance/:id',component:AssistancePageComponent,canActivate:[AuthGuard]},
  { path: 'view-assistance/:id',component:AssistanceViewPageComponent,canActivate:[AuthGuard]},
  { path: 'register-teacher',component:RegisterTeacherPageComponent,canActivate:[AuthGuard]},
  { path: 'enroll',component:EnrollPageComponent,canActivate:[AuthGuard]},
  { path: 'modal',component:ModalComponent,canActivate:[AuthGuard]},
  { path: '**', redirectTo: 'login' }, 
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
