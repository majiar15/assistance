import { Component, OnInit } from '@angular/core';
import { RegisterStudentComponent } from './register-student/register-student.component';

@Component({
    standalone: true,
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.css'],
    imports: [RegisterStudentComponent]
})
export class StudentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
