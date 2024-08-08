import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { StudentsService } from '../students.service';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule,ToastModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService]
})
export class RegisterStudentComponent implements OnInit {


  public form: FormGroup = new FormGroup({});

  loading = false;
  message: any;
  student_id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private studentsService: StudentsService,
    public appService: AppService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {


    this.student_id = this.route.snapshot.paramMap.get('id') || '';

    this.form = this.formBuilder.group({
      "dni": new FormControl('', [Validators.required, Validators.min(100000)]),
      "name": new FormControl('', [Validators.required]),
      "surnames": new FormControl('', [Validators.required]),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "code": new FormControl('', [Validators.required, Validators.min(100000)]),
      "academic_program": new FormControl('', [Validators.required]),
      "phone": new FormControl('', [Validators.required,Validators.min(1000000000), Validators.max(10000000000)]),
    })

    if (this.student_id) this.loadStudentData();
  }

  loadStudentData() {
    const find_student = this.studentsService.students.data.find(item => item._id == this.student_id)
    if (find_student) {
      this.patchFormValues(find_student);
    }else{
      this.studentsService.getStudent(this.student_id).subscribe({
        next:(response) => {
          if(response.valid){
            this.patchFormValues(response.data);

          }
        },
        error:(err) => {
          
          const message = err.message || 'Ha ocurrido un error, por favor intente nuevamente.';
          setTimeout(() => {
            this.messageService.add({
              severity: 'error',
              summary: '¡ERROR!.',
              detail: message
            });
          }, 700);
          
        }
      })
    }
  }

  private patchFormValues(student: any): void {
    this.form.patchValue({
      'dni': student.dni,
      'name': student.name,
      'surnames': student.surnames,
      'email': student.email,
      'code': student.code,
      'academic_program': student.academic_program._id,
      'phone': student.phone
    });
  }


  registerStudent() {

    if (this.form.valid) {
      this.loading = true;
      const data = this.getFormData();

      if (this.student_id) {
        this.updateStudent(data);
      } else {
        this.createStudent(data);
      }
    } else {
      this.form.markAllAsTouched();
      this.message = { text: 'Existes campos vacios', status: false }
    }
  }

  private getFormData() {
    return {
      email: this.form.value.email,
      dni: this.form.value.dni,
      name: this.form.value.name,
      surnames: this.form.value.surnames,
      code: this.form.value.code,
      academic_program: this.form.value.academic_program,
      password: `${this.form.value.dni}`,
      phone: this.form.value.phone
    };
  }

  private updateStudent(data: any) {
    delete data.password;
    this.httpService.updateItem(`/students/${this.student_id}`, data).subscribe({
      next: (response: any) => {

        this.loading = false;

        if (response.valid) {
          
          
          const student_index = this.studentsService.students.data.findIndex((item) => item._id == response.data._id)
          
          if (student_index > -1) {
            response.data['page'] = this.studentsService.students.data[student_index].page;
            this.studentsService.students.data[student_index] = response.data;
          }
          this.form.reset()
          this.message = { text: 'El estudiante ha sido actualizado correctamente.', status: true }
        } else {
          this.message = { text: 'Ha ocurrido un error, por favor intente nuevamente.', status: false }
        }

      },
      error: (err) => {
    
        const message = err.message || 'Ha ocurrido un error al actualizar, por favor intente nuevamente.'
      
        this.message = { text: message, status: false }
        this.loading = false;
      }
    });
  }

  private createStudent(data: any) {
    this.httpService.postItem('/students', data).subscribe({
      next: (response: any) => {
        if (response.valid) {
          this.message = { text: 'Estudiante registrado correctamente.', status: true }
          response.data['page'] = 1;
          this.studentsService.students.data.unshift(response.data);
          this.form.reset()
        } else {
          this.message = { text: 'Ha ocurrido un error, por favor intente nuevamente.', status: false }
        }
        this.loading = false;

      },
      error: (err) => {
        const message = err.message || 'Ha ocurrido un error, por favor intente nuevamente.';
        this.loading = false;
        this.message = { text: message, status: false }
      }
    })
  }

  isControlInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || control.dirty);
  }


}
