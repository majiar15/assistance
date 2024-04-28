import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';
import { CoursesService } from 'src/app/dashboard/courses/courses.service';

@Component({
  standalone:true,
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports:[CommonModule,FormsModule ]
})
export class ScheduleComponent implements OnInit {

  
  
  message:any;


  constructor(
    public coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
    
  }

  editItemSchedule(index:number){
    this.coursesService.schedule[index].disabled=false;
    this.coursesService.schedule.splice(index=1);
    this.coursesService.intensity=this.coursesService.intensityBefore
  }

  saveSchedule(index:number){
    debugger
    let i =index
    
    if(this.coursesService.schedule[i].day=='' ||this.coursesService.schedule[i].time_initial=='' || this.coursesService.schedule[i].time_end=='' ){
      this.message={text:'Existen campos vacios',status:false}
    }else{
      let hrentrada = moment(this.coursesService.schedule[i].time_initial, 'hh:mm A');
      let hrsalida = moment(this.coursesService.schedule[i].time_end, 'hh:mm A');
      
      console.log(hrsalida.diff(hrentrada),' -- ',this.coursesService.intensity );

      if(hrsalida.diff(hrentrada)< 3600000){
        this.message={text:'Minimo 1 hora de clases',status:false}
      }else{
        if(hrsalida.diff(hrentrada)<this.coursesService.intensity ){
          this.coursesService.intensityBefore=this.coursesService.intensity;
          this.coursesService.intensity-=hrsalida.diff(hrentrada)

          this.coursesService.schedule[index].disabled=true

          this.coursesService.schedule.push({ day: '', time_initial: "", time_end: "", disabled: false })
          
        }else if(hrsalida.diff(hrentrada)==this.coursesService.intensity ) {
          this.coursesService.intensity=0
          this.coursesService.schedule[index].disabled=true
          
        }else{
          this.message={text:'A superado el numero maximo de horas',status:false}
        }
      }
      
    }
    setTimeout(()=>{
      this.message=null;
    },3000)

  }
  
}
