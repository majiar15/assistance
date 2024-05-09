import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { DurationPipe } from 'src/app/shared/pipe/home.pipe';
import { CommonModule } from '@angular/common';
import { CoursesService } from 'src/app/dashboard/courses/courses.service';
import { HttpUtilsService } from 'src/app/shared/services/http-utils.service';
import { TeacherService } from 'src/app/dashboard/teacher/teacher.service';
import { ScheduleComponent } from './schedule/schedule.component';


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

  constructor(
    private formBuilder: FormBuilder,
    private httpUtis: HttpUtilsService,
    public coursesService: CoursesService,
    public teacherService: TeacherService,

  ) { }

  ngOnInit(): void {

    // if (this.teacherService.teachers.length == 0) {
    //   this.httpUtis.getItem('/teachers').subscribe((response: any) => {
    //     if (response.valid) {
    //       this.teacherService.teachers = response.data
    //     }
    //   })
    // }


    this.form = this.formBuilder.group({

      "name": new FormControl('', [Validators.required]),
      "date_start": new FormControl('', [Validators.required]),
      "date_end": new FormControl('', [Validators.required]),
      "teacher_id": new FormControl('', [Validators.required]),
      "description": new FormControl('')

    })
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

    if (this.form.valid) {
      console.log("ENVIAR CURSO");

      this.loading = true;
      let duration = new DurationPipe().transform(this.form.value.fecha_inicial, this.form.value.fecha_fin)
      console.log(' -- ', duration);
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
      console.log("🚀 ~ DATA:", data)

      console.log(' -- ', data);

      this.httpUtis.postItem('/courses', data).subscribe({
        next: (response: any) => {
          this.loading = false;
          if (response.valid) {
            this.coursesService.courses.unshift(response.data)
            this.form.reset()
            this.coursesService.intensity = 0;
            this.coursesService.intensityBefore = 0;

            this.coursesService.schedule = [];
            this.message = { text: 'Profesor registrado correctamente', status: true }
          }else{
            this.message = { text: 'Ha ocurrido un error, por favor intente nuevamente.', status: false }
          }


        },
        error: (error: any) => {
          this.loading = false;
          console.log(error);
          this.message = { text: 'Ha ocurrido un error, por favor intente nuevamente.', status: false }
        }
      })


    } else {
      this.message = { text: 'Existen campos vacios.', status: false }
    }


  }
}
