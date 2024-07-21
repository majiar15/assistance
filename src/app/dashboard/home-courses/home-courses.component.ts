
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-courses',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './home-courses.component.html',
  styleUrl: './home-courses.component.css',

})
export class HomeCoursesComponent  implements OnInit{

 
  constructor() { }

  ngOnInit(): void {
  }

}
