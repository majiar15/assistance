import { Component, OnInit } from '@angular/core';
import { RegisterStudentComponent } from "../../components/register-student/register-student.component";
import { SidebarComponent } from 'src/app/core/sidebar/sidebar.component';

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
