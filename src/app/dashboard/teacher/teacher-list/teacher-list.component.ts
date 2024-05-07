import { Component } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableComponent } from 'src/app/components/table/table.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule,RouterLink, TableComponent, FormsModule],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent {

  titles = ["dni","name","phone","email"];
  data: any[] = [];
  searchText: string = '';
  constructor(
    public teacherService:TeacherService,
  ){
    // formatear objeto para darle la estructura
    this.data = this.formatData(this.teacherService.teachers)
  }

  formatData(teachers: any[]): any[] {
    return teachers.map((teacher)=>{
      return {
        dni: teacher.dni,
        name: teacher.name,
        phone: teacher.phone,
        email: teacher.email,
        _id: teacher._id
      };
    });
  }

  filterData(): void {
    if(this.searchText === ""){
      this.data = this.formatData(this.teacherService.teachers);
    }
    const searchTextLower = this.searchText.toLowerCase().trim();

    const dataFilter = this.teacherService.teachers.filter((item: any) => {
      return Object.keys(item).some(key => {
        const value = item[key].toString().toLowerCase();
        return value.includes(searchTextLower);
      });
    });

    this.data = this.formatData(dataFilter);
  };




}
