import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { StudentsService } from '../../students/students.service';
import { HomeCoursesService } from '../home-courses.service';
import { Student } from 'src/app/shared/interfaces/interfaces';
import { TableAssistanceComponent } from 'src/app/components/table-assistance/table-assistance.component';

@Component({
    standalone: true,
    selector: 'app-assistance',
    templateUrl: './assistance.component.html',
    styleUrls: ['./assistance.component.css'],
    imports: [CommonModule, RouterLink,FormsModule, TableAssistanceComponent,ModalComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [MessageService]
})
export class AssistanceComponent implements OnInit {
  id!: string;
  titles = ["DNI - Código", "Nombre", "email", "programa"];
  data: any[] = [];
  date: string = '';
  students: Student[] = [];
  constructor(
    public studentsService:StudentsService,
    public homeCoursesService:HomeCoursesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      this.getLastAssist();
      this.getStudentsEnrolled();
    });
  }


  formatData(students: any[]): any[] {
    return students.map((student) => {
      return {
        dni: student.dni,
        name: student.name + ' ' + student.surnames || '',
        email: student.email,
        programa: student.academic_program.name,
        assist: false,
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
  getLastAssist() {
    this.homeCoursesService.getLastAssist(this.id).subscribe((response)=>{
      this.date = response.data.date;
    });
  }
  getStudentsEnrolled() {
    this.homeCoursesService.getStudentsEnrolled(this.id).subscribe((response)=>{
      this.data = this.formatData(response.data.students);
      this.getAsistanceByDate();
    });
  }
  getAsistanceByDate() {
    this.homeCoursesService.getAsistanceByDate(this.id, this.date).subscribe((response)=>{
      const studentIdsWithAttendance = response.data.map((attendance:any) => attendance.student_id);
      this.data = this.data.map((element)=>{
        return {
          ...element,
          assist: studentIdsWithAttendance.includes(element._id) ? true : false
        }
      });
      console.log(this.data);
    });
  }
  takeAssist(student:Student){
    console.log("this.isToday()",this.isToday());
    if(this.isToday()){
        this.homeCoursesService.takeAssitance(this.id, student._id).subscribe((response)=>{
          this.getAsistanceByDate();
        });
    }
  }

  isToday(): boolean {
    const [year, month, day] = this.date.split('-').map(Number);
    const inputDate = new Date(year, month - 1, day);
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    return inputDate.getTime() === today.getTime();
  }
}
