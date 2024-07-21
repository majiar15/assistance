import { Component,CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CourseGridComponent } from "../../../components/course-grid/course-grid.component";
import { Course } from 'src/app/shared/interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';
import { CoursesService } from '../../courses/courses.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalType } from 'src/app/shared/enum/modalType';
import { HomeCoursesService } from '../home-courses.service';

@Component({
    selector: 'select-course-assistance',
    standalone: true,
    templateUrl: './select-course-assistance.component.html',
    styleUrl: './select-course-assistance.component.css',
    imports: [CommonModule,FormsModule, CourseGridComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectCourseAssistanceComponent implements OnInit {


  public courses:Course[]=[];
  showModal:boolean = false;
  modal_type:number = ModalType.SELECT_OPTIONS;
  modal_buttons:Array<any> = [];
  data_delete:any;

  public colors = [
    'colorRed', 'colorBlue', 'colorGreen', 'colorYellow',
    'colorSilver', 'colorWhite', 'colorBlack', 'colorRed', 'colorGreen'];
  constructor(
    public homeCoursesService:HomeCoursesService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.homeCoursesService.fetchCourses().subscribe((response) => {
      if(response.valid){

        this.courses=response.data;
        }
    });
  }


  selectCourse(course:Course){
    this.homeCoursesService.selectedCourse =course;
    this.router.navigate([`dashboard/assistance`, course._id])
  }
  
  deleteProperty(){

  }
  cancel(){

  }
}
