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
import { debounceTime, Subject } from 'rxjs';

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
  searchSubject: Subject<any> = new Subject();

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

    this.searchSubject.pipe(debounceTime(400)).subscribe((response) => {
      this.filterData()
    })

  }

  formatData(teachers: any[]): any[] {
    return teachers.map((teacher) => {
      return {
        dni: teacher.dni,
        name: teacher.name + ' ' + teacher.surnames || '',
        phone: teacher.phone,
        email: teacher.email,
        _id: teacher._id,
        page:teacher.hasOwnProperty('page')?teacher.page:1
      };
    });
  }

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.trim() === '') {
      this.data = this.formatData(this.teacherService.teachers.data)
    }
  }

  filterData(): void {
    if (this.searchText === "") {
      this.data = this.formatData(this.teacherService.teachers.data);
      return;
    }
    const searchTextLower = this.searchText.toLowerCase().trim();

    const dataFilter = this.teacherService.teachers.data.filter((item: any) =>
      Object.values(item).some(value => {
        if (typeof value === 'string' || typeof value === 'number') {
          return value.toString().toLowerCase().includes(searchTextLower);
        }
        return false;
      })
    );

    if (dataFilter.length===0) {
      this.searchTeacher()
    } else {
      const data = dataFilter.map(student => ({
        ...student,
        page: 1,
      }));
      this.data = this.formatData(data);
    }
  };


  searchTeacher() {
    this.teacherService.searchTeacher(this.searchText).subscribe({
      next: (response: any) => {
        if (response.valid) {
          this.data = this.formatData(response.data);
        }
      },
      error: (error) => {

      }
    })
  }


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
          severity: 'error',
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
