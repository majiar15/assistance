import { Component } from '@angular/core';
import { StudentsService } from '../students.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css'
})
export class StudentsListComponent {


  constructor(public studentsService:StudentsService){}
}
