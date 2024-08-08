import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { StudentsService } from '../../students/students.service';
import { HomeCoursesService } from '../home-courses.service';
import { Schedule, Student } from 'src/app/shared/interfaces/interfaces';
import { TableAssistanceComponent } from 'src/app/components/table-assistance/table-assistance.component';
import { DatePickerComponent } from 'src/app/components/datepicker/datepicker.component';
import { getDayNumber } from 'src/app/shared/model/format';

@Component({
    standalone: true,
    selector: 'app-assistance',
    templateUrl: './assistance.component.html',
    styleUrls: ['./assistance.component.css'],
    imports: [
      CommonModule, RouterLink,
      FormsModule, TableAssistanceComponent,
      ModalComponent,ToastModule, DatePickerComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [MessageService]
})
export class AssistanceComponent implements OnInit {
  id!: string;
  titles = ["DNI - Código", "Nombre", "email", "programa"];
  data: any[] = [];
  date: string = this.formatDateForInput(new Date());
  students: Student[] = [];
  datesAvailable: number[] = [];
  scheduleFilterToday: Schedule | null = null;
  constructor(
    public studentsService:StudentsService,
    public homeCoursesService:HomeCoursesService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      this.getScheduleByCourse();
 
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
        assist: 'no',
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
      if (this.scheduleFilterToday){
        this.date = this.formatDateForInput(new Date());
      }else{

        this.date = response.data.date;

        if (!response?.data?.date) {
          this.date = this.formatDateForInput(new Date());
        }
      }
    });
  }
  private formatDateForInput(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  getScheduleByCourse() {
    this.homeCoursesService.getScheduleByCourse(this.id).subscribe((response)=>{
      this.scheduleFilterToday = response.data.filter((schedule:any) => {
        const dayNumberSchedule = getDayNumber(schedule.week_day);
        this.datesAvailable.push(dayNumberSchedule);
        const today = new Date();
        const dayNumber = today.getDay();
        if(dayNumberSchedule == dayNumber){
          return schedule;
        }
      })[0] ?? null;

      this.getLastAssist();
    });
  }
  getStudentsEnrolled() {
    
    this.homeCoursesService.getStudentsEnrolled(this.id).subscribe((response)=>{
      this.data = this.formatData(response.data.students);
      if (this.data.length > 0) {
        this.getAsistanceByDate();
      }
    });
  }
  getAsistanceByDate() {
    this.homeCoursesService.getAsistanceByDate(this.id, this.date).subscribe((response) => {
        const attendanceData = response.data;

        // Crear un mapa para la asistencia de los estudiantes
        const attendanceMap = new Map();
        attendanceData.forEach((attendance: any) => {
            attendanceMap.set(attendance.student_id, attendance.late ? 'late' : 'done');
        });

        // Actualizar los datos con la propiedad assist
        this.data = this.data.map((element) => {
          console.log("attendanceMap", attendanceMap);
            const assistStatus = attendanceMap.get(element._id) || 'no';
            return {
                ...element,
                assist: assistStatus
            };
        });
        console.log("data", this.data);
    });
}
  onDateSelected(event: any){
    if (event.isValid) {
      this.date =event.date;
      this.getAsistanceByDate();
    }else{

      this.messageService.add({
        severity: 'error',
        summary: 'Dia incorrecto.',
        detail: 'No tiene clases en este dia.'
      });
      
      console.log("no valida");
    }
  }
  takeAssist(student:Student){
    if(this.isToday()){
        this.homeCoursesService.takeAssitance(this.id, student._id).subscribe((response)=>{
          this.messageService.add({
            severity: 'success',
            summary: 'Muy bien!',
            detail: 'Asistencia tomada correctamente.'
          });
          this.getAsistanceByDate();
        },
        (response)=>{
          this.messageService.add({
            severity: 'error',
            summary: 'Opps!!',
            detail: `${response.message}.`
          });
        }
      );
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
