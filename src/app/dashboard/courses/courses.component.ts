import { Component, OnInit } from '@angular/core';
import { SubjectsComponent } from 'src/app/components/subjects/subjects.component';


@Component({
    standalone: true,
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css'],
    imports: [SubjectsComponent]
})
export class CoursesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
