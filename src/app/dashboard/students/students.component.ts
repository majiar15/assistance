import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.css'],
    imports: [RouterModule]
})
export class StudentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
