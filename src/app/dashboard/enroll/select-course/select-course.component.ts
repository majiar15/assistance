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
    public coursesService: CoursesService,
    private enrollService: EnrollService,
    public router: Router,
  ) { }

  ngOnInit(): void {

    if (this.coursesService.courses.data.length == 0) {
      this.coursesService.getCourses().subscribe({
        next: (response) => {
          if (response.valid) {

            this.coursesService.courses = response;
            this.courses = this.coursesService.courses.data;
          }
        },
        error: (err) => {
          console.error('Error fetching COURSES:', err);
        }
      });
    } else {
      this.courses = this.coursesService.courses.data;
    }


    if (this.coursesService.courses.data.length) {
      this.courses = this.coursesService.courses.data;
    } 
    this.searchSubject.pipe(debounceTime(300)).subscribe((response) => {
      this.filterData();
    })
  }


  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.trim() == '') {
      this.courses = this.coursesService.courses.data;
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
        }else{
          this.courses = [];
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


  getMoreCourse(event: any) {

    const metadata = this.coursesService.courses.metadata;
    if (metadata) {
      const { page, pageCount,limit } = metadata;
      if (!event.pageFetching.includes(event.page)) {
        this.coursesService.getMoreCourse(event.page,limit).subscribe((response)=>{
          console.log("🚀 ~ response:", response)

          if(response.valid){
            this.coursesService.courses.data.push(...response.data);
            this.coursesService.courses.metadata = response.metadata;
            this.courses = this.coursesService.courses.data
          }
        });
      }

    }
  }
}
