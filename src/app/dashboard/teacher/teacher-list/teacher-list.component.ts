import { Component } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent {

  constructor(
    public teacherService:TeacherService,
  ){}

}
