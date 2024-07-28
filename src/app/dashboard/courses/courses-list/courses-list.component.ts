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
import { TeacherService } from '../../teacher/teacher.service';
import { AppService } from 'src/app/app.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
    selector: 'app-courses-list',
    standalone: true,
    templateUrl: './courses-list.component.html',
    styleUrl: './courses-list.component.css',
    imports: [
        CommonModule, RouterLink,
        TableComponent,ToastModule,
        ModalComponent,FormsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService]
})
export class CoursesListComponent implements OnInit {

  titles = ["Id", "Nombre", "Fecha de Inicio", "Fecha de finalización"];
  data: any[] = [];
  searchText: string = '';
  showModal:boolean = false;
  modal_type:number = ModalType.SELECT_OPTIONS;
  modal_buttons:Array<any> = [];
  data_delete:any;
  searchSubject: Subject<any> = new Subject();

  constructor(
    public coursesService: CoursesService,
    public teacherService: TeacherService,
    private messageService: MessageService,
    private appService:AppService,
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
          console.error('Error fetching COURSES:', err);
        }
      });
    } else {
      this.data = this.formatData(this.coursesService.courses.data)
    }

    this.searchSubject.pipe(debounceTime(400)).subscribe((response) => {
      this.filterData()
    })
    
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
        page:course.hasOwnProperty('page')?course.page:1
      };
    });
  }

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.trim() === '') {
      this.data = this.formatData(this.coursesService.courses.data)
    }
  }

  filterData(): void {
    if (this.searchText === "") {
      this.data = this.formatData(this.coursesService.courses.data);
    }
    const searchTextLower = this.searchText.toLowerCase().trim();

    const dataFilter = this.teacherService.teachers.data.filter((item: any) =>
      Object.values(item).some(value => {
        if (typeof value === 'string' || typeof value === 'number') {
          return value.toString().toLowerCase().includes(searchTextLower);
        }
        return false;
      })
    );

    if (dataFilter.length===0) {
      this.searchCourse()
    } else {
      const data = dataFilter.map(student => ({
        ...student,
        page: 1,
      }));
      this.data = this.formatData(data);
    }
  };

  searchCourse() {
    this.coursesService.searchCourse(this.searchText).subscribe({
      next: (response: any) => {
        if (response.valid) {
          this.data = this.formatData(response.data);
        }
      },
      error: (error) => {

      }
    })
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
    this.deleteCourse(this.data_delete);
    this.cancel();
  }

  deleteCourse(data: any) {

    this.coursesService.deleteCourse(data._id).subscribe((response: any) => {
    
      if (response.valid && response.data.deletedCount > 0) {

        this.coursesService.courses.data = this.coursesService.courses.data.filter((item) => item._id != data._id)
        this.data = this.formatData(this.coursesService.courses.data);

        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado correctamente.',
          detail: 'El curso ha sido eliminado correctamente.'
        });

      } else {

        this.messageService.add({
          severity: 'Error',
          summary: 'Ha ocurrido un error.',
          detail: 'Ha ocurrido un error al eliminar el curso, por favor intenta nuevamente.'
        });
      }

    })
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
