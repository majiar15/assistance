import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseGridComponent } from 'src/app/components/course-grid/course-grid.component';
import { StudentsService } from '../../students/students.service';
import { EnrollService } from '../enroll.service';
import { CoursesService } from '../../courses/courses.service';
import { Student, Response } from 'src/app/shared/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'select-students',
  standalone: true,
  templateUrl: './select-students.component.html',
  styleUrl: './select-students.component.css',
  imports: [CommonModule, FormsModule, CourseGridComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectStudentsComponent {

  titles = ["Documento de identidad", "Nombre", "Facultad", "Programa"];
  students: any[] = []
  enrolledStudents: any[] = [];
  course_id: string = '';
  searchText: string = '';
  loading: boolean = false;
  searchSubject: Subject<any> = new Subject();
  private subscriptions: Subscription[] = [];

  constructor(
    private coursesService: CoursesService,
    private enrollService: EnrollService,
    private studentsService: StudentsService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {

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
    }));
  }



  getObjectKeys(obj: any): string[] {
    const newObject = { ...obj }; // se utiliza desestructuracion para romper el enlace con el objeto origial
    delete newObject._id;
    return Object.keys(newObject);
  }


  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.trim() === '') {
      this.students = this.filterEnrolledStudent(this.studentsService.students.data)
    }
  }

  filterData(): void {
    if (!this.searchText) {
      return;
    }

    this.subscriptions.push(
      this.enrollService.searchStudents(this.searchText).subscribe({
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
      return;
    }

    const ids = this.enrolledStudents.map(item => item._id);
    const data = {
      course_id: this.course_id,
      students: ids
    }

    this.subscriptions.push(
      this.enrollService.enrollStudents(data).subscribe({
        next:(response: any) => {
        console.log("🚀 ~ SelectStudentsComponent ~ this.enrollService.enrollStudents ~ response:", response)
        this.loading = false;
      },
      error:(err)=>{
        console.error("ERROR enrollStudents: ",err);
        
      }
    }),
    )
  }

}
