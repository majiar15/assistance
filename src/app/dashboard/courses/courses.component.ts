import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
    standalone: true,
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css'],
    imports: [RouterModule]
})
export class CoursesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
