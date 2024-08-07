import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import * as moment from 'moment';
import { CoursesService } from 'src/app/dashboard/courses/courses.service';
import { weekdays } from 'src/app/shared/model/format';

@Component({
  standalone: true,
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule,NgSelectModule]
})
export class ScheduleComponent implements OnInit {



  message: any;
  weekdays: Array<any> = Object.assign(weekdays);

  constructor(
    public coursesService: CoursesService,
  ) { }

  ngOnInit(): void {

  }

  editItemSchedule(index: number) {

    this.coursesService.schedule[index].disabled = false;
    this.coursesService.intensity += this.coursesService.schedule[index].hour_milliseconds
    this.coursesService.schedule.splice(index = 1);
    
  }

  saveSchedule(index: number) {
    
    const { week_day, room, hour_start, hour_end } = this.coursesService.schedule[index]

    if (week_day == '' || room == '' || hour_start == '' || hour_end == '') {
      this.message = { text: 'Existen campos vacios', status: false, index: index }

    } else {
      const  hrEntrada  = moment(hour_start, 'hh:mm A');
      const  hrSalida  = moment(hour_end, 'hh:mm A');
      const duration = hrSalida.diff(hrEntrada);

      if (duration < 3600000) {

        this.message = { text: 'Minimo 1 hora de clases', status: false, index: index }

      } else {
        
        if (duration < this.coursesService.intensity) {

          this.coursesService.schedule[index].hour_milliseconds =duration
          this.coursesService.intensity -= duration

          this.coursesService.schedule[index].disabled = true;

          this.coursesService.schedule.push({ week_day: '', hour_start: "", hour_end: "", room: "",hour_milliseconds:0, disabled: false })

          this.weekdays = this.weekdays.filter(item => item.value != week_day)

        } else if (duration == this.coursesService.intensity) {
          this.coursesService.schedule[index].hour_milliseconds =duration
          this.coursesService.intensity = 0
          this.coursesService.schedule[index].disabled = true

        } else {
          this.message = { text: 'A superado el numero maximo de horas', status: false, index: index }
        }
      }

    }
    setTimeout(() => {
      this.message = null;
    }, 3000)

  }

}
