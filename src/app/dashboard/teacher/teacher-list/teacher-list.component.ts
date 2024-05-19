import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableComponent } from 'src/app/components/table/table.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from "../../../components/modal/modal.component";
import { HttpUtilsService } from 'src/app/shared/services/http-utils.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


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
export class TeacherListComponent {

  titles = ["Documento de identidad", "Nombre", "Telefono", "Email"];
  data: any[] = [];
  searchText: string = '';

  showModal:boolean = false;
  modal_type:number = 0;
  modal_buttons:Array<any> = [];
  data_delete:any;

  constructor(
    public teacherService: TeacherService,
    private httpUtis: HttpUtilsService,
    private messageService: MessageService
  ) {
    // formatear objeto para darle la estructura
    this.data = this.formatData(this.teacherService.teachers)
  }

  formatData(teachers: any[]): any[] {
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


  deleteTeacher(data: any) {

    this.httpUtis.deleteItem(`/teachers/${data._id}`).subscribe((response: any) => {  

      if (response.valid && response.data.deletedCount > 0) {

        this.teacherService.teachers = this.teacherService.teachers.filter((item) => item._id != data._id)
        this.data = this.formatData(this.teacherService.teachers);

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
    this.modal_type=1;
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
    this.deleteTeacher(this.data_delete);
    this.cancel();
  }

  cancel(){
    this.data_delete=null;
    this.modal_type=0;
    this.showModal=false;
    this.modal_buttons=[]
  }

}
