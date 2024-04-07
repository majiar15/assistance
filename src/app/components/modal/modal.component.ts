import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';


@Component({
  standalone:true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  
})
export class ModalComponent implements OnInit {

  @Input() show: string = '';
  @Input() course_ID: string = '';
  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor(
    private appService:AppService,
    public router: Router,
  ) { 
    
  }

  
  ngOnInit(): void {
  }

  close(): void {
    this.closeModalEvent.emit(false);
  }
  viewAssistance(){
    this.router.navigate([`/view-assistance/${this.course_ID}`,])
    
  }
  addAsistance(){
    console.log("Navgaraaaa");
    this.router.navigate([`/assistance/${this.course_ID}`,])
    
  }

}
