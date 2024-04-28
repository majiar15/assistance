import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TeacherService } from './teacher.service';
import { RegisterTeacherComponent } from "./register-teacher/register-teacher.component";

@Component({
    standalone: true,
    selector: 'app-teacher',
    templateUrl: './teacher.component.html',
    styleUrls: ['./teacher.component.css'],
    imports: [CommonModule, RegisterTeacherComponent]
})
export class TeacherComponent implements OnInit {

  constructor(
    public teacherService:TeacherService,
  ) { }

  ngOnInit(): void {
  console.log("🚀 ~ TeacherComponent ~ ngOnInit ~ ngOnInit:", )
    
  }

}
