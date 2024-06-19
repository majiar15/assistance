import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'course-grid',
    standalone: true,
    templateUrl: './course-grid.component.html',
    styleUrl: './course-grid.component.css',
    imports: [CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class CourseGridComponent {

  loading:boolean = false;

  @Input() courses:any;
  @Output() courseEvent = new EventEmitter<any>();

  public colors = [
    'colorRed', 'colorBlue', 'colorGreen', 'colorYellow',
    'colorSilver', 'colorWhite', 'colorBlack', 'colorRed', 'colorGreen'];

  constructor(){

  }


  showModal(course:any){
    //this.modal=true;
    this.courseEvent.emit(course)
  }

}
