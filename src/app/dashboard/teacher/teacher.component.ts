import { Component, OnInit } from '@angular/core';
import { RegisterTeacherComponent } from "../../components/register-teacher/register-teacher.component";

@Component({
    standalone: true,
    selector: 'app-teacher',
    templateUrl: './teacher.component.html',
    styleUrls: ['./teacher.component.css'],
    imports: [RegisterTeacherComponent]
})
export class TeacherComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
