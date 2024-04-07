import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports:[CommonModule]
})
export class CardComponent implements OnInit {
  @Input() title: string = '';
  @Input() classStyle: string = '';

  modal=false;
  constructor() { }

  ngOnInit(): void {
  }

  showModal(){
    this.modal=true;
  }

}
