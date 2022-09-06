import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
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
