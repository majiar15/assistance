import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Metadata } from 'src/app/shared/interfaces/interfaces';

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

  @Input() courses: any = [];
  @Input() metadata: Metadata | undefined = undefined;


  @Output() courseEvent = new EventEmitter<any>();
  @Output() paginationItem: EventEmitter<any> = new EventEmitter();
  public colors = [
    'colorRed', 'colorBlue', 'colorGreen', 'colorYellow',
    'colorSilver', 'colorWhite', 'colorBlack', 'colorRed', 'colorGreen'];

  public courseColors: string[] = [];

  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;
  pageFetching: number[] = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courses']) {
      this.assignRandomColors();
    }
    if (changes['metadata'] && changes['metadata'].currentValue != undefined) {

      this.pageSize = changes['metadata'].currentValue.limit;
      this.totalItems = changes['metadata'].currentValue.itemCount;
      this.totalPages = changes['metadata'].currentValue.pageCount;
      this.pageFetching.push(this.currentPage);
    }
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    let pageDate = this.courses.filter((value: any) => value.page == this.currentPage);

    return pageDate
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

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginationItem.emit({
        page,
        limit: this.metadata?.limit,
        pageFetching: this.pageFetching
      })
    }
  }
}
