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
    imports: [ScheduleComponent,CommonModule,ReactiveFormsModule]
})
export class CreateCourseComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  message: any;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpUtis: HttpUtilsService,
    public coursesService: CoursesService,
    public teacherService:TeacherService,

  ) { }

  ngOnInit(): void {

    if (this.teacherService.teachers.length == 0) {
      this.httpUtis.getItem('/teachers').subscribe((response: any) => {
        if (response.valid) {
          this.teacherService.teachers = response.data
        }
      })
    }


    this.form = this.formBuilder.group({
      
      "name": new FormControl('', [Validators.required]),
      "date_start": new FormControl('', [Validators.required]),
      "date_end": new FormControl('', [Validators.required]),
      "teacher_id": new FormControl('', [Validators.required]),
      

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
        this.coursesService.schedule.push({ day: '', time_initial: "", time_end: "", disabled: false })
      }
      if (event.target.value == '') {
        this.coursesService.schedule = []
      }

    }
  }



  registerSchedule() {

    if (this.form.valid) {
      console.log("ENVIAR CURSO");
      
    //   this.loading = true;
    //   let duration=new DurationPipe().transform(this.form.value.fecha_inicial,this.form.value.fecha_fin)
    //   console.log(' -- ',duration);
    //   for (let index = 0; index < this.subjectService.schedule.length; index++) {
        
    //     delete this.subjectService.schedule[index]['active']
        
    //   }
      
    //   let data = {
    //     profesor_id: this.form.value.profesor_id,
    //     duracion: duration,
    //     nombre: this.form.value.nombre,
    //     fecha_inicial: this.form.value.fecha_inicial,
    //     fecha_fin: this.form.value.fecha_fin,
    //     horarios:this.subjectService.schedule
    //   }
      
    //   console.log(' -- ',data);
      
    //   this.subjectService.asignarCourse(data).subscribe({
    //     next: (response: any) => {
    //       this.loading = false;
    //       this.form.reset()
    //       this.subjectService.intensity=0;
          
    //       this.subjectService.schedule=[];
    //       this.message = { text: 'Profesor registrado correctamente', status: true }
    //     },
    //     error: (error:any) => {
    //       this.loading = false;
    //       console.log(error);
    //       this.message = { text: 'Ha ocurrido un error, por favor intente nuevamente.', status: false }
    //     }
    //   })


    // }else{
    //   this.message = { text: 'Existen campos vacios.', status: false }
    // }

    // setTimeout(() => {
    //   this.message=null;  
    // }, 3000);
    }else{
      this.message={text:'Existes campos vacios',status:false}
    }
  }
}
