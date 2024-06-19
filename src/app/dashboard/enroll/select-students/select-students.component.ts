import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseGridComponent } from 'src/app/components/course-grid/course-grid.component';
import { StudentsService } from '../../students/students.service';
import { EnrollService } from '../enroll.service';
import { CoursesService } from '../../courses/courses.service';
import { Student } from 'src/app/shared/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';

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
  students: any[]=[]
  enrolledStudents: any[]=[];
  course_id: string = '';
  searchSubject: Subject<any> = new Subject();
  public searchText: string = '';
  loading:boolean = false;
  constructor(
    private coursesService: CoursesService,
    private enrollService: EnrollService,
    private studentsService: StudentsService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    console.log("🚀 ~ EnrollComponent ~ ngOnInit ~ ngOnInit:",this.route.snapshot.paramMap.get('id'))
    if (this.route.snapshot.paramMap.get('id')) {
      this.course_id = this.route.snapshot.paramMap.get('id') || '';

    }

    if (this.studentsService.students.length) {
       
       this.students = this.formatData(this.studentsService.students)
    } else {
      this.studentsService.studentsSubject.subscribe((student) => {
        this.students = this.filterEnrolledStudent(student)
      })
    }

    this.searchSubject.pipe(debounceTime(300)).subscribe((response) => {

      this.filterData();
    })
  }

  formatData(students: Student[]): any[] {
    console.log("🚀 ~ EnrollComponent ~ formatData ~ students:", students)
    return students.map((student) => {
      return {
        dni: student.dni,
        name: student.name + ' ' + student.surnames || '',
        faculty: student.academic_program.faculty,
        program: student.academic_program.name,
        _id: student._id,
      };
    });
  }

  

  getObjectKeys(obj: any): string[] {
    const newObject = { ...obj }; // se utiliza desestructuracion para romper el enlace con el objeto origial
    delete newObject._id;
    return Object.keys(newObject);
  }


  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.trim() === '') {
      this.students = this.filterEnrolledStudent(this.studentsService.students)
    }
  }

  filterData() {
    if (!this.searchText) {
      return;
    }

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

  }

  addEnrolledStudent(student:any){
    console.log("🚀 ~ ADD STUDENT:", student)
    
    this.enrolledStudents.push(student);
    this.students = this.students.filter(item=>item._id != student._id)
  }

  removeEnrolledStudent(student:any){
 
  this.enrolledStudents = this.enrolledStudents.filter(item=>item._id != student._id)
  this.students.push(student);

  }

  filterEnrolledStudent(students:Student[]) {

    const ids = this.enrolledStudents.map(item => item._id);
    const filter = students.filter(obj => !ids.includes(obj._id));
    return this.formatData(filter)
  }
  
  enroll(){
    this.loading = true;
    if(!this.enrolledStudents.length){
      return;
    }

    const ids = this.enrolledStudents.map(item => item._id);
    console.log("🚀 ~ SelectStudentsComponent ~ enroll ~ ids:", ids)
    const data ={
      course_id:this.course_id,
      students:ids
    }
    this.enrollService.enrollStudents(data).subscribe((response:any) => {
      console.log("🚀 ~ SelectStudentsComponent ~ this.enrollService.enrollStudents ~ response:", response)
      
    })


  }

}
