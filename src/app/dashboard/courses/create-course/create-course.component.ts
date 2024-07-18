import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { DurationPipe } from 'src/app/shared/pipe/home.pipe';
import { CommonModule } from '@angular/common';
import { CoursesService } from 'src/app/dashboard/courses/courses.service';
import { TeacherService } from 'src/app/dashboard/teacher/teacher.service';
import { ScheduleComponent } from './schedule/schedule.component';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';


@Component({
  standalone: true,
  selector: 'create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
  imports: [ScheduleComponent, CommonModule, ReactiveFormsModule]
})
export class CreateCourseComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  message: any;
  loading = false;

  course_id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    public coursesService: CoursesService,
    public teacherService: TeacherService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    if (this.route.snapshot.paramMap.get('id')) {
      this.course_id = this.route.snapshot.paramMap.get('id') || '';

    }


    this.form = this.formBuilder.group({

      "name": new FormControl('', [Validators.required]),
      "date_start": new FormControl('', [Validators.required]),
      "date_end": new FormControl('', [Validators.required]),
      "teacher_id": new FormControl('', [Validators.required]),
      "description": new FormControl('')

    })

    if (this.course_id) this.loadCourseData();
  }

  loadCourseData() {
    const course = this.coursesService.courses.find(item => item._id == this.course_id)
    if (course) {

      this.form.patchValue({

        'name': course.name,
        'date_start': course.date_start,
        'date_end': course.date_end,
        'teacher_id': course.teacher_id,
        'description': course.description,
      });
    }
    this.coursesService.schedule = (course?.schedules_ids || []).map((item, index, array) => ({
      ...item,
      disabled: index === array.length - 1 ? false : true
    }));
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
      this.coursesService.intensityBefore = Number(event.target.value) * 3600000

      if (this.coursesService.schedule.length == 0 && event.target.value != '') {
        this.coursesService.schedule.push({ week_day: '', hour_start: "", hour_end: "", room: "", disabled: false })
      }
      if (event.target.value == '') {
        this.coursesService.schedule = []
      }

    }
  }


  registerSchedule() {

    if (!this.form.valid) {

      this.message = { text: 'Existen campos vacios.', status: false }
      return;
    }

    this.loading = true;

    for (let index = 0; index < this.coursesService.schedule.length; index++) {

      delete this.coursesService.schedule[index]['disabled']

    }

    let data = {
      teacher_id: this.form.value.teacher_id,
      name: this.form.value.name,
      date_start: this.form.value.date_start,
      date_end: this.form.value.date_end,
      description: this.form.value.description,
      schedules: this.coursesService.schedule
    }

    const endpoint = this.course_id ? `/courses/${this.course_id}` : '/courses';

    this.httpService[this.course_id ? 'updateItem' : 'postItem'](endpoint, data).subscribe({
      next: (response: any) => {
        this.handleResponse(response);
      },
      error: (error) => {

        this.loading = false;
        console.log(error);

        this.message = { text: 'Ha ocurrido un error, por favor intente nuevamente.', status: false }
      }
    })
  }

  handleResponse(response: any) {

    if (response.valid) {

      if (this.course_id) {

        const courseIndex = this.coursesService.courses.findIndex(item => item._id === response.data._id);
        
        if (courseIndex > -1) {
          this.coursesService.courses[courseIndex] = response.data;
        }

      } else {
        this.coursesService.courses.unshift(response.data);
      }
      
      this.form.reset();
      this.coursesService.intensity = 0;
      this.coursesService.intensityBefore = 0;
      this.coursesService.schedule = [];
      this.loading = false;
      this.message = { text: this.course_id ? 'El curso ha sido actualizado correctamente' : 'El curso ha sido registrado correctamente', status: true };
    } else {
      this.message = { text: 'Ha ocurrido un error, por favor intente nuevamente.', status: false };
    }
  }
}
