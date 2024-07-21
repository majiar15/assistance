import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { StudentsService } from '../../students/students.service';
import { HomeCoursesService } from '../home-courses.service';

@Component({
    standalone: true,
    selector: 'app-assistance',
    templateUrl: './assistance.component.html',
    styleUrls: ['./assistance.component.css'],
    imports: [CommonModule, RouterLink,FormsModule, TableComponent,ModalComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [MessageService]
})
export class AssistanceComponent implements OnInit {
  titles = ["DNI - Código", "Nombre", "Programa", "Fecha","Hora","Estado"];
  data: any[] = [];
  searchText: string = '';

  constructor(
    public studentsService:StudentsService,
    public homeCoursesService:HomeCoursesService,
  ) { }

  ngOnInit(): void {
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


  deleteStudent(data: any) {

    // this.httpService.deleteItem(`/students/${data._id}`).subscribe((response: any) => {  

    //   if (response.valid && response.data.deletedCount > 0) {

    //     this.studentsService.students.data = this.studentsService.students.data.filter((item) => item._id != data._id)
    //     this.data = this.formatData(this.studentsService.students.data);

    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Eliminado correctamente.',
    //       detail: 'El profesor ha sido eliminado correctamente.'
    //     });
        
    //   } else {

    //     this.messageService.add({
    //       severity: 'Error',
    //       summary: 'Ha ocurrido un error.',
    //       detail: 'Ha ocurrido un error al eliminar el profesor, por favor intenta nuevamente.'
    //     });
    //   }

    // })
  }

 

  getMoreStudent(event: any) {

    // const metadata = this.studentsService.students.metadata;
    // if (metadata) {
    //   const { limit } = metadata;
    //   if (!event.pageFetching.includes(event.page)) {
    //     this.studentsService.getMoreStudent(event.page,limit).subscribe((response)=>{
    //       if(response.valid){
    //         this.studentsService.students.data.push(...response.data);
    //         this.studentsService.students.metadata = response.metadata;
    //         this.data = this.formatData(this.studentsService.students.data)
    //       }
    //     })
    //   }
    // }
    
  }

}
