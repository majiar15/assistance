import { Component, OnInit } from '@angular/core';
import { SubjectsComponent } from 'src/app/components/subjects/subjects.component';


@Component({
    standalone: true,
    selector: 'app-assign-course',
    templateUrl: './assign-course.component.html',
    styleUrls: ['./assign-course.component.css'],
    imports: [SubjectsComponent]
})
export class AssignCourseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
