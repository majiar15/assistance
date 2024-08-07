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
import { ModalBitacoraComponent } from "../../../components/modal-bitacora/modal-bitacora.component";
import { DashboardService } from '../../dashboard.service';
import { BitacoraService } from 'src/app/components/modal-bitacora/modal-bitacora.service';

@Component({
    selector: 'select-course-assistance',
    standalone: true,
    templateUrl: './select-course-assistance.component.html',
    styleUrl: './select-course-assistance.component.css',
    imports: [CommonModule, FormsModule, CourseGridComponent, ModalBitacoraComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectCourseAssistanceComponent implements OnInit {


  public courses:Course[]=[];
  showModal:boolean = false;
  modal_type:number = ModalType.SELECT_OPTIONS;
  modal_buttons:Array<any> = [];
  data_delete:any;
  showModalBitacora:boolean=false;

  public colors = [
    'colorRed', 'colorBlue', 'colorGreen', 'colorYellow',
    'colorSilver', 'colorWhite', 'colorBlack', 'colorRed', 'colorGreen'];
  constructor(
    public homeCoursesService:HomeCoursesService,
    public router: Router,
    public dashboardService: DashboardService,
    public bitacoraService: BitacoraService,
  ) {
    this.inProgress()
   }

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

  inProgress(){
    return this.homeCoursesService.inProgress().subscribe((resp:any)=>{
    
      if(resp.valid && resp.data!=null){
        this.homeCoursesService.getBitacora(resp.data._id).subscribe((response)=>{
          if(!response.valid &&  !this.showModalBitacora){
            console.log("por aca entramos");
            this.showModalBitacora=true;
            this.homeCoursesService.courseBitacora=resp.data;
            this.homeCoursesService.inClass = true;
            this.homeCoursesService.startInterval();
            this.openQRPage()
          }
        })
        
      }

    });
  }
  openQRPage(){
        this.bitacoraService.openQRPage();
  }
}
