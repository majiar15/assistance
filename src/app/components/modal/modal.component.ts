import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() show: string = '';
  @Output() closeModalEvent = new EventEmitter<boolean>();
  constructor() { 
    
  }

  
  ngOnInit(): void {
  }

  close(): void {
    this.closeModalEvent.emit(false);
  }

}
