import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeacherService } from './teacher.service';

@Component({
    standalone: true,
    selector: 'app-teacher',
    templateUrl: './teacher.component.html',
    styleUrls: ['./teacher.component.css'],
    imports: [CommonModule,RouterModule]
})
export class TeacherComponent implements OnInit {

  constructor(
    private teacherService:TeacherService
  ) { }

  ngOnInit(): void {}

}
