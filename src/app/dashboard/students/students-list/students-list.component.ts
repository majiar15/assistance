import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableComponent } from "../../../components/table/table.component";
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { HttpService } from 'src/app/shared/services/http.service';
import { ModalType } from "src/app/shared/enum/modalType";

@Component({
    selector: 'app-students-list',
    standalone: true,
    templateUrl: './students-list.component.html',
    styleUrl: './students-list.component.css',
    imports: [CommonModule, RouterLink,FormsModule, TableComponent,ModalComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [MessageService]

})
export class StudentsListComponent implements OnInit {

  titles = ["Documento de identidad", "Nombre", "Telefono", "Email"];
  data: any[] = [];
  searchText: string = '';

  showModal:boolean = false;
  modal_type:number = ModalType.SELECT_OPTIONS;
  modal_buttons:Array<any> = [];
  data_delete:any;

  constructor(
    public studentsService:StudentsService,
    private httpService: HttpService,
    private messageService: MessageService

  ){
  }

  ngOnInit(): void {

    if (this.studentsService.students.data.length == 0) {
      this.studentsService.getStudent().subscribe({
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
  }


  formatData(students: any[]): any[] {
    return students.map((student) => {
      return {
        dni: student.dni,
        name: student.name + ' ' + student.surnames || '',
        phone: student.phone,
        email: student.email,
        _id: student._id
      };
    });
  }

  filterData(): void {
    if (this.searchText === "") {
      this.data = this.formatData(this.studentsService.students.data);
    }
    const searchTextLower = this.searchText.toLowerCase().trim();

    const dataFilter = this.studentsService.students.data.filter((item: any) => {
      return Object.keys(item).some(key => {
        const value = item[key].toString().toLowerCase();
        return value.includes(searchTextLower);
      });
    });

    this.data = this.formatData(dataFilter);
  };

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
          severity: 'Error',
          summary: 'Ha ocurrido un error.',
          detail: 'Ha ocurrido un error al eliminar el profesor, por favor intenta nuevamente.'
        });
      }

    })
  }


  deleteConfirmProperty(data:any){
    this.data_delete=data;
    this.modal_type=ModalType.DELETE_STUDENT;
    this.showModal=true;
    this.modal_buttons=[
      {
        name:'Eliminar'
      },
      {
        name:'Cancelar'
      }, 
    ]    
  }

  deleteProperty(){
    this.deleteStudent(this.data_delete);
    this.cancel();
  }

  cancel(){
    this.data_delete=null;
    this.modal_type=ModalType.SELECT_OPTIONS;
    this.showModal=false;
    this.modal_buttons=[]
  }

  getMoreStudent(event: any) {

    const metadata = this.studentsService.students.metadata;
    if (metadata) {
      const { limit } = metadata;
      if (!event.pageFetching.includes(event.page)) {
        this.studentsService.getMoreStudent(event.page,limit).subscribe((response)=>{
          if(response.valid){
            this.studentsService.students.data.push(...response.data);
            this.studentsService.students.metadata = response.metadata;
            this.data = this.formatData(this.studentsService.students.data)
          }
        })
      }
    }
    
  }

}
