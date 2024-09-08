import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ModalType } from "src/app/shared/enum/modalType";
import { HomeCoursesService } from 'src/app/dashboard/home-courses/home-courses.service';
import { ModalAssistanceService } from './modal-assistance.service';
import { formatDate } from 'src/app/util/format_fecha';

@Component({
  standalone: true,
  selector: 'modal-assistance',
  templateUrl: './modal-assistance.component.html',
  styleUrls: ['./modal-assistance.component.css'],
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule]

})
export class ModalAssistanceComponent implements OnInit {

  @Input() data:any;
  @Output() closeModalEvent = new EventEmitter<any>();

  loading: boolean = false;
  dataTable:any;
  topics:any[]=[];

  constructor(
    public router: Router,
    private modalAssistanceService:ModalAssistanceService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("🚀 ~ ModalAssistanceComponent ~ ngOnChanges ~ changes:", changes)
    if(changes['data'].currentValue!=undefined){
      this.loadAssistance()
    }
    
  }

  ngOnInit(): void {
    console.log("ON INIT");
    
  }

  loadAssistance(){
    this.loading=true;
    this.modalAssistanceService.getAssistanceByStudent(this.data._id,this.data.course_id).subscribe((response)=>{
      console.log("LOAD ASSISTANCE: ",response);
      if(response.valid){
        this.dataTable = response.data.map((value:any)=>{
          
          const date = formatDate(value.date);
          this.topics.push({name:value.bitacora,date})
          let assistance ;
           
          if(value.assistances.length==1){
            assistance = value.assistances[0].late?'-':'X'
          }else{
            assistance=null;
          }

          return {
            date,
            assistance
          }
        })
        console.log("🚀 this.dataTable:", this.dataTable)

      }
      this.loading=false;
    })
  }

  close(): void {
    this.closeModalEvent.emit(false);
    this.topics = [];
    this.dataTable = []
    this.loading = false
  }




  
}
