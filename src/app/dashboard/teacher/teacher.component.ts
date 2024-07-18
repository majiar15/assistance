import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-teacher',
    templateUrl: './teacher.component.html',
    styleUrls: ['./teacher.component.css'],
    imports: [CommonModule,RouterModule]
})
export class TeacherComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

}
