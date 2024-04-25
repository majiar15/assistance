import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';
import { RegisterSubjectService } from 'src/app/dashboard/courses/courses.service';

@Component({
  standalone:true,
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports:[CommonModule,FormsModule ]
})
export class ScheduleComponent implements OnInit {

  @Input() indice:number=0;
  
  
  message:any;



  

  constructor(
    public subjectService: RegisterSubjectService,
  ) { }

  ngOnInit(): void {
    
  }

  saveSchedule(){
    
    let i =this.indice
    
    if(this.subjectService.schedule[i].day=='' ||this.subjectService.schedule[i].time_initial=='' || this.subjectService.schedule[i].time_end=='' ){
      this.message={text:'Existen campos vacios',status:false}
    }else{
      let hrentrada = moment(this.subjectService.schedule[i].time_initial, 'hh:mm A');
      let hrsalida = moment(this.subjectService.schedule[i].time_end, 'hh:mm A');
      
      console.log(hrsalida.diff(hrentrada),' -- ',this.subjectService.intensity );

      if(hrsalida.diff(hrentrada)< 3600000){
        this.message={text:'Minimo 1 hora de clases',status:false}
      }else{
        if(hrsalida.diff(hrentrada)<this.subjectService.intensity ){
          this.subjectService.intensity-=hrsalida.diff(hrentrada)

          this.subjectService.schedule[this.indice].active=true

          this.subjectService.schedule.push({ day: '', time_initial: "", time_end: "", active: false })
          
        }else if(hrsalida.diff(hrentrada)==this.subjectService.intensity ) {
          this.subjectService.intensity=0
          this.subjectService.schedule[this.indice].active=true
          
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
