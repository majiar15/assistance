import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {HomeCoursesService} from './home-courses.service'
import { Course } from 'src/app/shared/interfaces/interfaces';
import { CourseGridComponent } from 'src/app/components/course-grid/course-grid.component';
import { ModalType } from 'src/app/shared/enum/modalType';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-courses',
  standalone: true,
  imports: [ CommonModule, CourseGridComponent, ModalComponent],
  templateUrl: './home-courses.component.html',
  styleUrl: './home-courses.component.css',

})
export class HomeCoursesComponent  implements OnInit{

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
    console.log("object");
    this.router.navigate([`/assistance/`, course._id])
  }
  deleteProperty(){

  }
  cancel(){

  }
}
