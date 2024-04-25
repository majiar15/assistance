import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { HomeCoursesComponent } from "./home-courses/home-courses.component";
import { StudentsComponent } from "./students/students.component";
import { TeacherComponent } from "./teacher/teacher.component";
import { CoursesComponent } from "./courses/courses.component";

const routes: Routes = [
    
    
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }
  