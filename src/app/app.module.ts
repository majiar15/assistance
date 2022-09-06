import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

import { HomeComponent } from './pages/home/home.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardComponent } from './components/card/card.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { RegisterStudentsPageComponent } from './pages/register-students-page/register-students-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    CardComponent,
    SubjectsComponent,
    ScheduleComponent,
    RegisterStudentComponent,
    SidebarItemComponent,
    RegisterStudentsPageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
