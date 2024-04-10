import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { HomeCoursesComponent } from "./home-courses/home-courses.component";
import { StudentsComponent } from "./students/students.component";
import { TeacherComponent } from "./teacher/teacher.component";
import { AssignCourseComponent } from "./assign-course/assign-course.component";

const routes: Routes = [
    { path: '', component: HomeCoursesComponent,
        children:[
            { path: '', component: HomeCoursesComponent, pathMatch: 'full' }, // Ruta hija vacía que carga AboutComponent
            { path: 'student', component: StudentsComponent },
            { path: 'teacher', component: TeacherComponent },
            { path: 'assistance', component: AssignCourseComponent },
        ]
    },
    
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }
  