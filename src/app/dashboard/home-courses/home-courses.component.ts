import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home-courses',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './home-courses.component.html',
  styleUrl: './home-courses.component.css',

})
export class HomeCoursesComponent {

  @Input() loading:boolean=false;
  public colors = [
    'colorRed', 'colorBlue', 'colorGreen', 'colorYellow',
    'colorSilver', 'colorWhite', 'colorBlack', 'colorRed', 'colorGreen'];
  constructor(
    public appService: AppService
  ) { }

  // showModal(course:any) {

  //   this.course_active=course;
  //   this.modal = !this.modal;
  //   console.log('Se ejecuto el click de card desde home', this.modal);
  // }
}
