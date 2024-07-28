import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableComponent } from "../../../components/table/table.component";
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { HttpService } from 'src/app/shared/services/http.service';
import { ModalType } from "src/app/shared/enum/modalType";
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-students-list',
  standalone: true,
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    TableComponent,
    ModalComponent,
    ToastModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService]

})
export class StudentsListComponent implements OnInit {

  titles = ["Documento de identidad", "Nombre", "Telefono", "Email"];
  data: any[] = [];
  searchText: string = '';

  showModal: boolean = false;
  modal_type: number = ModalType.SELECT_OPTIONS;
  modal_buttons: Array<any> = [];
  data_delete: any;
  searchSubject: Subject<any> = new Subject();


  constructor(
    public studentsService: StudentsService,
    private httpService: HttpService,
    private messageService: MessageService

  ) {
  }

  ngOnInit(): void {

    if (this.studentsService.students.data.length == 0) {
      this.studentsService.getAllStudent().subscribe({
        next: (response) => {
          if (response.valid) {
            this.studentsService.students = response;
            this.data = this.formatData(this.studentsService.students.data)
          }
        },
        error: (err) => {
          console.error('Error fetching students:', err);
        }
      });
    } else {
      this.data = this.formatData(this.studentsService.students.data)
    }

    this.searchSubject.pipe(debounceTime(400)).subscribe((response) => {
      this.filterData()
    })
  }


  formatData(students: any[]): any[] {
    return students.map((student) => {
      return {
        dni: student.dni,
        name: student.name + ' ' + student.surnames || '',
        phone: student.phone,
        email: student.email,
        _id: student._id,
        page: student.hasOwnProperty('page') ? student.page : 1
      };
    });
  }

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.trim() === '') {
      this.data = this.formatData(this.studentsService.students.data)
    }
  }

  filterData(): void {

    if (!this.searchText.trim()) {
      this.data = this.formatData(this.studentsService.students.data);
      return;
    }
    const searchTextLower = this.searchText.toLowerCase().trim();

    const dataFilter = this.studentsService.students.data.filter((item: any) =>
      Object.values(item).some(value => {
        if (typeof value === 'string' || typeof value === 'number') {
          return value.toString().toLowerCase().includes(searchTextLower);
        }
        return false;
      })
    );

    if (dataFilter.length===0) {
      this.searchStudents()
    } else {
      const data = dataFilter.map(student => ({
        ...student,
        page: 1,
      }));
      this.data = this.formatData(data);
    }

  };

  searchStudents() {
    this.studentsService.searchStudents(this.searchText).subscribe({
      next: (response: any) => {
        if (response.valid) {
          this.data = this.formatData(response.data);
        }
      },
      error: (error) => {

      }
    })
  }




  deleteStudent(data: any) {

    this.httpService.deleteItem(`/students/${data._id}`).subscribe((response: any) => {

      if (response.valid && response.data.deletedCount > 0) {

        this.studentsService.students.data = this.studentsService.students.data.filter((item) => item._id != data._id)
        this.data = this.formatData(this.studentsService.students.data);

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
    this.modal_type = ModalType.DELETE_STUDENT;
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
    this.deleteStudent(this.data_delete);
    this.cancel();
  }

  cancel() {
    this.data_delete = null;
    this.modal_type = ModalType.SELECT_OPTIONS;
    this.showModal = false;
    this.modal_buttons = []
  }

  getMoreStudent(event: any) {

    const metadata = this.studentsService.students.metadata;
    if (metadata) {
      const { limit } = metadata;
      if (!event.pageFetching.includes(event.page)) {
        this.studentsService.getMoreStudent(event.page, limit).subscribe((response) => {
          if (response.valid) {
            this.studentsService.students.data.push(...response.data);
            this.studentsService.students.metadata = response.metadata;
            this.data = this.formatData(this.studentsService.students.data)
          }
        })
      }
    }

  }

}
