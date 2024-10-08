import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoursesService } from 'src/app/dashboard/courses/courses.service';
import { TeacherService } from 'src/app/dashboard/teacher/teacher.service';
import { ScheduleComponent } from './schedule/schedule.component';
import { ActivatedRoute } from '@angular/router';
import {NgSelectModule} from '@ng-select/ng-select';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';
import { AcademicProgram } from 'src/app/shared/interfaces/interfaces';
import { MessageService } from 'primeng/api';
@Component({
  standalone: true,
  selector: 'create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
  imports: [
    ScheduleComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService]
  
})
export class CreateCourseComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  message: any;
  loading = false;
  course_id: string = '';

  academic_programs:any[] = [];
 
  constructor(
    private formBuilder: FormBuilder,
    public coursesService: CoursesService,
    public teacherService: TeacherService,
    public appService:AppService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) { }

  

  ngOnInit(): void {

    this.course_id = this.route.snapshot.paramMap.get('id') || '';


    this.loadTeacher()

    this.form = this.formBuilder.group({

      "name": new FormControl('', [Validators.required]),
      "date_start": new FormControl('', [Validators.required]),
      "date_end": new FormControl('', [Validators.required]),
      "teacher_id": new FormControl('', [Validators.required]),
      "intensity": new FormControl('', [Validators.required]),
      "description": new FormControl(''),
      "academic_program": new FormControl([], [Validators.required])

    })

    if (this.course_id) this.loadCourseData();

    if(this.appService.academic_programs.length){
      this.academic_programs = this.appService.academic_programs;
    }else{
      this.appService.getAcademicProgram().subscribe((response) => {
        if (response.valid) {
          this.academic_programs = response.data;
        }
  
      })
    }
  }


  loadCourseData() {
    const course = this.coursesService.courses.data.find(item => item._id == this.course_id)
    console.log("🚀 ~ CreateCourseComponent ~ loadCourseData ~ course:", course)
    
    if (course) {
      
      this.patchFormValues(course);
      this.coursesService.intensity =course.schedules[course.schedules.length-1].hour_milliseconds;
      this.coursesService.schedule = (course.schedules || []).map((item, index, array) => ({
        ...item,
        disabled: index === array.length - 1 ? false : true
      }));
    }else{
      this.coursesService.getCourse(this.course_id).subscribe({
        next:(response) => {
          console.log("🚀 ~ getCourse: ", response)
          this.patchFormValues(response.data);
          this.coursesService.intensity =response.data.schedules[response.data.schedules.length-1].hour_milliseconds;
          this.coursesService.schedule = (response.data.schedules || []).map((item:any, index: number, array: any[]) => ({
            ...item,
            disabled: index === array.length - 1 ? false : true
          }));
        },
        error:(err)=>{
          const message = err.message || 'Ha ocurrido un error, por favor intente nuevamente.';
          setTimeout(() => {
            this.messageService.add({
              severity: 'error',
              summary: '¡ERROR!.',
              detail: message
            });
          }, 700);
        }
      })
    }

    
  }

  private patchFormValues(course: any): void {

    const dateStart = moment(course.date_start).format('YYYY-MM-DD');
    const dateEnd = moment(course.date_end).format('YYYY-MM-DD');

    this.form.patchValue({
      'name': course.name,
      'date_start': dateStart,
      'date_end': dateEnd,
      'teacher_id': course.teacher_id,
      'description': course.description,
      'intensity':course.intensity,
      'academic_program':course.academic_programs

    });
  }
  


  showSchedule(event: any) {
    console.log(typeof event.target.value);
    if (Number(event.target.value) > 5) {
      this.message = { text: 'Solo puede ingresar 5 horas maximo', status: false }
      setTimeout(() => {
        this.message = null
      }, 3000)

    } else {
      this.coursesService.intensity = Number(event.target.value) * 3600000

      if (this.coursesService.schedule.length == 0 && event.target.value != '') {
        this.coursesService.schedule.push({ week_day: '', hour_start: "", hour_end: "", room: "", disabled: false ,hour_milliseconds:0})
      }
      if (event.target.value == '') {
        this.coursesService.schedule = []
      }

    }
  }


  registerSchedule() {
    
    if (!this.form.valid) {
      this.form.markAllAsTouched();
     
      this.message = { text: 'Existen campos vacios.', status: false }
      setTimeout(() => {
        this.message = null
      }, 3000)
      return;
    }

    this.loading = true;

    for (let index = 0; index < this.coursesService.schedule.length; index++) {

      delete this.coursesService.schedule[index]['disabled']

    }

    const data = {
      teacher_id: this.form.value.teacher_id,
      name: this.form.value.name,
      date_start: this.form.value.date_start,
      date_end: this.form.value.date_end,
      description: this.form.value.description,
      schedules: this.coursesService.schedule,
      intensity:this.form.value.intensity,
      academic_programs:this.form.value.academic_program
    }

    if(this.course_id){
      this.updateCourse(data);
    }else{
      this.createCourse(data);
    }

    
  }

  private createCourse(data: any) {
    this.coursesService.createCourse(data).subscribe({
      next: (response: any) => {
        this.handleResponse(response);
      },
      error: (err) => this.handleError(err)
    })
  }

  private updateCourse(data: any) {
    this.coursesService.updateCourse(this.course_id, data).subscribe({
      next: (response: any) => {
        this.handleResponse(response);
      },
      error: (err) => this.handleError(err)
    })
  }

  handleResponse(response: any) {

    if (response.valid) {

      if (this.course_id) {

        const courseIndex = this.coursesService.courses.data.findIndex(item => item._id === response.data._id);

        if (courseIndex > -1) {
          this.coursesService.courses.data[courseIndex] = response.data;
        }

      } else {
        response.data['page'] = 1;
        this.coursesService.courses.data.unshift(response.data);
      }

      this.form.reset();
      this.coursesService.intensity = 0;
      this.coursesService.schedule = [];
      this.loading = false;
      this.message = { text: this.course_id ? 'El curso ha sido actualizado correctamente' : 'El curso ha sido registrado correctamente', status: true };
    } else {
      this.message = { text: 'Ha ocurrido un error, por favor intente nuevamente.', status: false };
    }
  }

  private handleError(err: any) {
    const message = err.message || 'Ha ocurrido un error, por favor intente nuevamente.';
    this.loading = false;
    this.message = { status:false,text:message  };
  }

  isControlInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || control.dirty);
  }


  async loadTeacher() {
    try {
      let page = 1;
      const limit = 5; // Según tu metadata, el límite parece ser 5
      let hasMorePages = true;

      while (hasMorePages) {
        const response = await this.teacherService.getMoreTeachers(page, limit).toPromise();

        if (response?.valid) {
          this.coursesService.teachers.push(...response.data);

          const metadata = response.metadata;
          if (metadata) {
            page = metadata.page < metadata.pageCount ? metadata.page + 1 : metadata.pageCount;
            hasMorePages = metadata.page < metadata.pageCount;
          } else {
            hasMorePages = false;
          }
        } else {
          hasMorePages = false;
        }
      }

    } catch (error) {
      console.log("🚀 ~ Error loading teachers:", error);
    }
  }


  ngOnDestroy():void{
    this.coursesService.schedule=[];
    this.coursesService.intensity=0;
  }
}
