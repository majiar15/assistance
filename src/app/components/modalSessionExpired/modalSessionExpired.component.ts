import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  standalone:true,
  selector: 'app-modal-expired',
  templateUrl: './modalSessionExpired.component.html',
  styleUrls: ['./modalSessionExpired.component.css']
})
export class ModalSessionExpiredComponent implements OnInit {

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
