import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CourseGridComponent } from 'src/app/components/course-grid/course-grid.component';
import { StudentsService } from '../../students/students.service';
import { EnrollService } from '../enroll.service';
import { CoursesService } from '../../courses/courses.service';
import { Student, Response } from 'src/app/shared/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { TableEnrollComponent } from "./table-enroll/table-enroll.component";
import { TableEnrollType } from 'src/app/shared/enum/modalType';

@Component({
  selector: 'select-students',
  standalone: true,
  templateUrl: './select-students.component.html',
  styleUrl: './select-students.component.css',
  imports: [CommonModule, FormsModule, CourseGridComponent, ToastModule, TableEnrollComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService]
})
export class SelectStudentsComponent {

  tableType = TableEnrollType;
  titles = ["Documento de identidad", "Nombre", "Facultad", "Programa"];
  students: any[] = []
  enrolledStudents: any[] = [];
  course_id: string = '';
  searchText: string = '';
  loading: boolean = false;
  loadingFile: boolean = false;
  searchSubject: Subject<any> = new Subject();
  private subscriptions: Subscription[] = [];

  constructor(
    private messageService: MessageService,
    public enrollService: EnrollService,
    private studentsService: StudentsService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.tableType.LIST_STUDENT
    this.course_id = this.route.snapshot.paramMap.get('id') || '';


    this.searchSubject.pipe(debounceTime(300)).subscribe((response) => {
      this.filterData();
    })

    this.start();
  }

  ngOnDestroy(): void {
    console.log("ON DESTROY");
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.enrollService.default();
  }

  private start(): void {
    const loadPromises = [
      this.loadEnrolledStudents(),
      this.loadUnenrolledStudents()
    ];

    Promise.all(loadPromises).then(responses => {
      console.log("🚀 All promises resolved with:", responses);
    });
  }

  private loadEnrolledStudents(): Promise<boolean> {
    return new Promise(resolve => {
      this.subscriptions.push(
        this.enrollService.getStudentsEnrolled(this.course_id).subscribe({
          next: (response: Response<Student>) => {
            if (response.valid) {
              this.enrollService.enrolledStudents = response;
              this.enrolledStudents = this.formatData(response.data);
            }
            resolve(true);
          },
          error: (error) => {
            console.error('Error fetching enrolled students:', error);
            resolve(false);
          }
        })
      );
    });
  }

  private loadUnenrolledStudents(): Promise<boolean> {
    return new Promise(resolve => {
      this.subscriptions.push(
        this.enrollService.getUnenrolledStudents(this.course_id).subscribe({
          next: (response: Response<Student>) => {
            if (response.valid) {
              this.enrollService.unenrolledStudents = response;
              this.students = this.formatData(response.data);
            }
            resolve(true);
          },
          error: (error) => {
            console.error('Error fetching unenrolled students:', error);
            resolve(false);
          }
        })
      );
    });
  }

  formatData(students: Student[]): any[] {
    return students.map((student) => ({
      dni: student.dni,
      name: student.name + ' ' + student.surnames || '',
      faculty: student.academic_program.faculty,
      program: student.academic_program.name,
      _id: student._id,
      page: student.hasOwnProperty('page') ? student.page : 1
    }));
  }



  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.trim() === '') {
      this.students = this.filterEnrolledStudent(this.enrollService.unenrolledStudents!.data)
    }
  }

  filterData(): void {
    if (!this.searchText) {
      return;
    }

    this.subscriptions.push(
      this.enrollService.searchStudents(this.searchText, this.course_id).subscribe({
        next: (response: any) => {
          if (response.valid && response.data.length) {
            this.students = this.filterEnrolledStudent(response.data)
          }
        },
        error: (error) => {
          console.error("🚀 ~ SEARCH COURSE ERROR:", error)
          this.students = []
        }
      })
    );
  }

  addEnrolledStudent(student: any): void {

    this.enrolledStudents.push(student);
    this.students = this.students.filter(item => item._id != student._id)
  }

  removeEnrolledStudent(student: any): void {

    this.enrolledStudents = this.enrolledStudents.filter(item => item._id != student._id)
    this.students.push(student);

  }

  filterEnrolledStudent(students: Student[]): any[] {

    const ids = this.enrolledStudents.map(item => item._id);
    const filter = students.filter(obj => !ids.includes(obj._id));
    return this.formatData(filter)
  }

  enroll(): void {

    this.loading = true;
    if (!this.enrolledStudents.length) {
      this.loading = false;
      return;
    }

    const ids = this.enrolledStudents.map(item => item._id);
    const data = {
      course_id: this.course_id,
      students: ids
    }

    this.subscriptions.push(
      this.enrollService.enrollStudents(data).subscribe({
        next: (response: any) => {

          this.loading = false;


          this.messageService.add({
            severity: 'success',
            summary: 'Matricula Exitosa!',
            detail: 'los estudiantes han sido matriculados correctamente.'
          });
        },
        error: (err) => {

          this.messageService.add({
            severity: 'error',
            summary: 'Error en la matrícula',
            detail: 'Ocurrió un problema al matricular a los estudiantes. Por favor, intenta nuevamente.'
          });
        }
      }),
    )
  }

  uploadFile(event: Event) {

    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;

    if (files && files.length > 0) {

      this.loadingFile = true;
      const file = files[0];

      const formData = new FormData();
      formData.append('file', file);
      formData.append('course_id', this.course_id);

      this.enrollService.uploadFile(formData).subscribe({
        next: (response: any) => {

          if (response.valid) {

            this.start();

            this.messageService.add({
              severity: 'success',
              summary: 'Matricula Exitosa!',
              detail: response.data
            });

          } else {

            this.messageService.add({
              severity: 'error',
              summary: 'Error en la matrícula',
              detail: 'Ocurrió un problema al matricular a los estudiantes. Por favor, intenta nuevamente.'
            });

          }

          this.loadingFile = false;

        },
        error: (error:Error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error en la matrícula',
            detail: error.message
          });
          this.loadingFile = false;
        }
      });
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'Error al cargar archivo.',
        detail: 'Debe seleccionar un archivo valido.'
      });
    }
  }

  getMore(event: any) {

    if (event.type == this.tableType.LIST_STUDENT) {
      const metadata = this.enrollService.unenrolledStudents?.metadata;
      if (metadata) {
        const { page, pageCount, limit } = metadata;
        if (!event.pageFetching.includes(event.page)) {

          this.enrollService.getMore('/not-enrolled', event.page, limit, this.course_id).subscribe((response) => {
            if (response.valid) {
              this.enrollService.unenrolledStudents?.data.push(...response.data);
              this.enrollService.unenrolledStudents!.metadata = response.metadata;
              this.students = this.formatData(this.enrollService.unenrolledStudents!.data)
            }
          });
        }

      }
    } else {
      const metadata = this.enrollService.enrolledStudents?.metadata;
      if (metadata) {
        const { page, pageCount, limit } = metadata;
        if (!event.pageFetching.includes(event.page)) {

          this.enrollService.getMore('/enrolled', event.page, limit, this.course_id).subscribe((response) => {
            if (response.valid) {
              this.enrollService.enrolledStudents?.data.push(...response.data);
              this.enrollService.enrolledStudents!.metadata = response.metadata;
              this.enrolledStudents = this.formatData(this.enrollService.enrolledStudents!.data)
            }
          });
        }

      }
    }
  }

}
