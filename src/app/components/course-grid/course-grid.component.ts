import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'course-grid',
    standalone: true,
    templateUrl: './course-grid.component.html',
    styleUrls: ['./course-grid.component.css'],
    imports: [CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CourseGridComponent implements OnChanges {

  loading: boolean = false;

  @Input() courses: any;
  @Output() courseEvent = new EventEmitter<any>();

  public colors = [
    'colorRed', 'colorBlue', 'colorGreen', 'colorYellow',
    'colorSilver', 'colorWhite', 'colorBlack', 'colorRed', 'colorGreen'];

  public courseColors: string[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courses']) {
      this.assignRandomColors();
    }
  }

  clickCard(course: any) {
    this.courseEvent.emit(course);
  }

  getRandomNumberColor(): number {
    return Math.floor(Math.random() * this.colors.length);
  }

  assignRandomColors() {
    this.courseColors = this.courses.map(() => this.colors[this.getRandomNumberColor()]);
  }
}
