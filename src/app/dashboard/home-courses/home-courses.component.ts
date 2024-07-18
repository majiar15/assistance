import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {HomeCoursesService} from './home-courses.service'
import { Course } from 'src/app/shared/interfaces/interfaces';
import { CourseGridComponent } from 'src/app/components/course-grid/course-grid.component';

@Component({
  selector: 'app-home-courses',
  standalone: true,
  imports: [ CommonModule, CourseGridComponent],
  templateUrl: './home-courses.component.html',
  styleUrl: './home-courses.component.css',

})
export class HomeCoursesComponent  implements OnInit{

  public courses:Course[]=[];

  public colors = [
    'colorRed', 'colorBlue', 'colorGreen', 'colorYellow',
    'colorSilver', 'colorWhite', 'colorBlack', 'colorRed', 'colorGreen'];
  constructor(
    public homeCoursesService:HomeCoursesService
  ) { }

  ngOnInit(): void {
    this.homeCoursesService.fetchCourses().subscribe((response) => {
      if(response.valid){

        this.courses=response.data;
        }
    });
  }

  // showModal(course:any) {

  //   this.course_active=course;
  //   this.modal = !this.modal;
  //   console.log('Se ejecuto el click de card desde home', this.modal);
  // }
}
