import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ModalComponent } from './components/modal/modal.component';
import { AssistancePageComponent } from './dashboard/assistance-page/assistance-page.component';
import { AssistanceViewPageComponent } from './dashboard/assistance-view-page/assistance-view-page.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { EnrollPageComponent } from './dashboard/enroll-page/enroll-page.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { TeacherGuard } from './shared/guards/teacher.guard';
import { ValidSessionGuard } from './shared/guards/valid-session.guard';
import { HomeCoursesComponent } from './dashboard/home-courses/home-courses.component';
import { StudentsComponent } from './dashboard/students/students.component';
import { CoursesComponent } from './dashboard/courses/courses.component';
import { TeacherComponent } from './dashboard/teacher/teacher.component';


const routes: Routes = [

  { 
    path: 'login', 
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
    
    canActivate:[AuthGuard]
  },
  
  
  { 
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard-routing.module'),
  
    canActivate:[ValidSessionGuard]
  },
  // { path: 'register',component: RegisterStudentsPageComponent,canActivate:[AuthGuard, TeacherGuard]},
  // { path: 'register-subject',component: RegisterSubjectPageComponent,canActivate:[AuthGuard, TeacherGuard]},
  // { path: 'assistance/:id',component:AssistancePageComponent,canActivate:[AuthGuard]},
  // { path: 'view-assistance/:id',component:AssistanceViewPageComponent,canActivate:[AuthGuard]},
  // { path: 'register-teacher',component:RegisterTeacherPageComponent,canActivate:[AuthGuard, TeacherGuard]},
  // { path: 'enroll',component:EnrollPageComponent,canActivate:[AuthGuard, TeacherGuard]},
  // { path: 'modal',component:ModalComponent,canActivate:[AuthGuard]},
  
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
