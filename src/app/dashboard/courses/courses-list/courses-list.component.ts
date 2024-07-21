import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoursesService } from '../courses.service';
import { TableComponent } from "../../../components/table/table.component";
import { ModalComponent } from "../../../components/modal/modal.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ModalType } from "src/app/shared/enum/modalType";
import * as moment from 'moment';

@Component({
    selector: 'app-courses-list',
    standalone: true,
    templateUrl: './courses-list.component.html',
    styleUrl: './courses-list.component.css',
    imports: [
        CommonModule, RouterLink,
        TableComponent,ToastModule,
        ModalComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService]
})
export class CoursesListComponent implements OnInit {

  titles = ["Id", "Nombre", "Fecha de Inicio", "Fecha de finalización"];
  data: any[] = [];

  showModal:boolean = false;
  modal_type:number = ModalType.SELECT_OPTIONS;
  modal_buttons:Array<any> = [];
  data_delete:any;

  constructor(
    public coursesService: CoursesService,
  ){}

  ngOnInit(): void {

    if (this.coursesService.courses.data.length == 0) {
      this.coursesService.getCourses().subscribe({
        next: (response) => {
          if (response.valid) {
            this.coursesService.courses = response;
            this.data = this.formatData(this.coursesService.courses.data)
          }
        },
        error: (err) => {
          console.error('Error fetching teachers:', err);
        }
      });
    } else {
      this.data = this.formatData(this.coursesService.courses.data)
    }
    
  }

  formatData(courses: any[]): any[] {
    return courses.map((course) => {
      const dateStart = moment(course.date_start).format('YYYY-MM-DD');
      const dateEnd = moment(course.date_end).format('YYYY-MM-DD');
      return {
        id: course._id,
        name: course.name,
        date_start: dateStart,
        date_end: dateEnd,
        _id: course._id,
      };
    });
  }

  deleteConfirmProperty(data:any){
    this.data_delete=data;
    this.modal_type=ModalType.DELETE_COURSES;
    this.showModal=true;
    this.modal_buttons=[
      {
        name:'Eliminar'
      },
      {
        name:'Cancelar'
      }, 
    ]    
  }

  deleteProperty(){
    
    this.cancel();
  }

  cancel(){
    this.data_delete=null;
    this.modal_type=ModalType.SELECT_OPTIONS;
    this.showModal=false;
    this.modal_buttons=[]
  }

  getMoreCourse(event: any) {

    const metadata = this.coursesService.courses.metadata;
    if (metadata) {
      const { page, pageCount,limit } = metadata;
      if (!event.pageFetching.includes(event.page)) {
        this.coursesService.getMoreCourse(event.page,limit).subscribe((response)=>{
          if(response.valid){
            this.coursesService.courses.data.push(...response.data);
            this.coursesService.courses.metadata = response.metadata;
            this.data = this.formatData(this.coursesService.courses.data)
          }
        });
      }

    }
  }

}
