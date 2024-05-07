import { Component } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableComponent } from 'src/app/components/table/table.component';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule,RouterLink, TableComponent],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent {

  titles = ["dni","name","phone","email"]
  data: any[] = []
  constructor(
    public teacherService:TeacherService,
  ){
    // formatear objeto para darle la estructura
    this.data = this.teacherService.teachers.map((teacher)=>{
      return {
        dni: teacher.dni,
        name: teacher.name,
        phone: teacher.phone,
        email: teacher.email,
        _id: teacher._id
      };
    });
  }

}
