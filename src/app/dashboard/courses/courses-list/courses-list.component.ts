import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    CommonModule,RouterLink
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent {

  constructor(
    public coursesService: CoursesService,
  ){}

}
