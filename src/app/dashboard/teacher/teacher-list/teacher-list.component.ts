import { Component } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableComponent } from 'src/app/components/table/table.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from "../../../components/modal/modal.component";

@Component({
    selector: 'app-teacher-list',
    standalone: true,
    templateUrl: './teacher-list.component.html',
    styleUrl: './teacher-list.component.css',
    imports: [CommonModule, RouterLink, TableComponent, FormsModule, ModalComponent]
})
export class TeacherListComponent {

  titles = ["Documento de identidad","Nombre","Telefono","Email"];
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
        name: teacher.name+' '+teacher.surnames||'',
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
