import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { ValidSessionGuard } from './shared/guards/valid-session.guard';



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
