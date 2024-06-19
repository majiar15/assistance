import { Component,CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CourseGridComponent } from "../../../components/course-grid/course-grid.component";
import { Course } from 'src/app/shared/interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';
import { CoursesService } from '../../courses/courses.service';
import { EnrollService } from '../enroll.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'select-course',
    standalone: true,
    templateUrl: './select-course.component.html',
    styleUrl: './select-course.component.css',
    imports: [CommonModule,FormsModule, CourseGridComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectCourseComponent implements OnInit {

  courses: Course[] = [];
  isCourseSelected: boolean = false;
  searchSubject: Subject<any> = new Subject();
  public searchText: string = '';


  constructor(
    private coursesService: CoursesService,
    private enrollService: EnrollService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    console.log("🚀 ~ SelectCourseComponent ~ ngOnInit ~ ngOnInit:")
    if (this.coursesService.courses.length) {
      this.courses = this.coursesService.courses;
    } else {
      this.coursesService.coursesSubject.subscribe((courses) => {
        this.courses = courses;
      })
    }

    this.searchSubject.pipe(debounceTime(300)).subscribe((response) => {
      this.filterData();
    })
  }


  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.trim() === '') {
      this.courses = this.coursesService.courses;
    }
  }

  filterData() {
    if (!this.searchText) {
      return;
    }

    this.enrollService.searchCourse(this.searchText).subscribe({
      next: (response: any) => {
        if (response.valid && response.data.length) {
          this.courses = response.data
        }
      },
      error: (error) => {
        console.error("🚀 ~ SEARCH COURSE ERROR:", error)
        this.courses = []
      }

    })

  }

  navigateToSelectStudents(course:any){
    this.router.navigate(['dashboard/enroll',course._id]);
  }
}
