import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import * as moment from 'moment';
import { DurationPipe } from 'src/app/shared/pipe/home.pipe';
import { CommonModule } from '@angular/common';
import { RegisterSubjectService } from 'src/app/dashboard/assign-course/assign-course.service';
import { ScheduleComponent } from '../schedule/schedule.component';


@Component({
    standalone: true,
    selector: 'app-subjects',
    templateUrl: './subjects.component.html',
    styleUrls: ['./subjects.component.css'],
    imports: [ScheduleComponent,CommonModule,ReactiveFormsModule]
})
export class SubjectsComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  message: any;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    public appService: AppService,
    public subjectService: RegisterSubjectService,

  ) { }

  ngOnInit(): void {

    if (this.appService.teacher.length == 0) {
      this.appService.getItem('/api/teacher').subscribe((response: any) => {
        if (response.data.length) {
          this.appService.teacher = response.data
        }
      })
    }


    this.form = this.formBuilder.group({
      
      "nombre": new FormControl('', [Validators.required]),
      "fecha_inicial": new FormControl('', [Validators.required]),
      "fecha_fin": new FormControl('', [Validators.required]),
      "profesor_id": new FormControl('', [Validators.required]),


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
      this.subjectService.intensity = Number(event.target.value) * 3600000
      
      if (this.subjectService.schedule.length == 0 && event.target.value != '') {
        this.subjectService.schedule.push({ day: '', time_initial: "", time_end: "", active: false })
      }
      if (event.target.value == '') {
        this.subjectService.schedule = []
      }

    }




  }
  registerSchedule() {
      
      
      

    if (this.form.valid) {
      this.loading = true;
      let duration=new DurationPipe().transform(this.form.value.fecha_inicial,this.form.value.fecha_fin)
      console.log(' -- ',duration);
      for (let index = 0; index < this.subjectService.schedule.length; index++) {
        
        delete this.subjectService.schedule[index]['active']
        
      }
      
      let data = {
        profesor_id: this.form.value.profesor_id,
        duracion: duration,
        nombre: this.form.value.nombre,
        fecha_inicial: this.form.value.fecha_inicial,
        fecha_fin: this.form.value.fecha_fin,
        horarios:this.subjectService.schedule
      }
      
      console.log(' -- ',data);
      
      this.subjectService.asignarCourse(data).subscribe({
        next: (response: any) => {
          this.loading = false;
          this.form.reset()
          this.subjectService.intensity=0;
          
          this.subjectService.schedule=[];
          this.message = { text: 'Profesor registrado correctamente', status: true }
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
          this.message = { text: 'Ha ocurrido un error, por favor intente nuevamente.', status: false }
        }
      })


    }else{
      this.message = { text: 'Existen campos vacios.', status: false }
    }

    setTimeout(() => {
      this.message=null;  
    }, 3000);
  } 
}
