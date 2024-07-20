import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableComponent } from 'src/app/components/table/table.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from "../../../components/modal/modal.component";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ModalType } from "src/app/shared/enum/modalType";
import { User } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css',
  imports: [CommonModule, RouterLink, TableComponent, FormsModule, ModalComponent,
    ToastModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService]
})
export class TeacherListComponent implements OnInit {

  titles = ["Documento de identidad", "Nombre", "Telefono", "Email"];
  data: any[] = [];
  searchText: string = '';

  showModal: boolean = false;
  modal_type: number = ModalType.SELECT_OPTIONS;
  modal_buttons: Array<any> = [];
  data_delete: any;

  constructor(
    public teacherService: TeacherService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    if (this.teacherService.teachers.data.length == 0) {
      this.teacherService.getTeachers().subscribe({
        next: (response) => {
          if (response.valid) {
            this.teacherService.teachers = response;
            this.data = this.formatData(this.teacherService.teachers.data)
          }
        },
        error: (err) => {
          console.error('Error fetching teachers:', err);
        }
      });
    } else {
      this.data = this.formatData(this.teacherService.teachers.data)
    }

  }

  formatData(teachers: User[]): any[] {
    return teachers.map((teacher) => {
      return {
        dni: teacher.dni,
        name: teacher.name + ' ' + teacher.surnames || '',
        phone: teacher.phone,
        email: teacher.email,
        _id: teacher._id
      };
    });
  }

  filterData(): void {
    if (this.searchText === "") {
      this.data = this.formatData(this.teacherService.teachers.data);
    }
    const searchTextLower = this.searchText.toLowerCase().trim();

    const dataFilter = this.teacherService.teachers.data.filter((item: any) => {
      return Object.keys(item).some(key => {
        const value = item[key].toString().toLowerCase();
        return value.includes(searchTextLower);
      });
    });

    this.data = this.formatData(dataFilter);
  };


  deleteTeacher(data: any) {

    this.teacherService.deleteTeacher(data._id).subscribe((response: any) => {

      if (response.valid && response.data.deletedCount > 0) {

        this.teacherService.teachers.data = this.teacherService.teachers.data.filter((item) => item._id != data._id)
        this.data = this.formatData(this.teacherService.teachers.data);

        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado correctamente.',
          detail: 'El profesor ha sido eliminado correctamente.'
        });

      } else {

        this.messageService.add({
          severity: 'Error',
          summary: 'Ha ocurrido un error.',
          detail: 'Ha ocurrido un error al eliminar el profesor, por favor intenta nuevamente.'
        });
      }

    })
  }

  deleteConfirmProperty(data: any) {
    this.data_delete = data;
    this.modal_type = ModalType.DELETE_TEACHER;
    this.showModal = true;
    this.modal_buttons = [
      {
        name: 'Eliminar'
      },
      {
        name: 'Cancelar'
      },
    ]
  }

  deleteProperty() {
    this.deleteTeacher(this.data_delete);
    this.cancel();
  }

  cancel() {
    this.data_delete = null;
    this.modal_type = ModalType.SELECT_OPTIONS;
    this.showModal = false;
    this.modal_buttons = []
  }

  getMoreTeacher(event: any) {

    const metadata = this.teacherService.teachers.metadata;
    if (metadata) {
      const { page, pageCount,limit } = metadata;
      if (!event.pageFetching.includes(event.page)) {
        this.teacherService.getMoreTeachers(event.page,limit).subscribe((response)=>{
          if(response.valid){
            this.teacherService.teachers.data.push(...response.data);
            this.teacherService.teachers.metadata = response.metadata;
            this.data = this.formatData(this.teacherService.teachers.data)
          }
        });
      }

    }
  }

}
