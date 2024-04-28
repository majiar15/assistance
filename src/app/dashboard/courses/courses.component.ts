import { Component, OnInit } from '@angular/core';
import { CreateCourseComponent } from './create-course/create-course.component';


@Component({
    standalone: true,
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css'],
    imports: [CreateCourseComponent]
})
export class CoursesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
