import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { HttpUtilsService } from 'src/app/shared/services/http-utils.service';
import { StudentsService } from '../students.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterStudentComponent implements OnInit {


  public form: FormGroup = new FormGroup({});

  loading = false;
  message: any;
  student_id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private httpUtis: HttpUtilsService,
    private studentsService: StudentsService,
    public appService: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    if (this.route.snapshot.paramMap.get('id')) {
      this.student_id = this.route.snapshot.paramMap.get('id') || '';

    }

    this.form = this.formBuilder.group({
      "dni": new FormControl('', [Validators.required, Validators.minLength(6)]),
      "name": new FormControl('', [Validators.required]),
      "surnames": new FormControl('', [Validators.required]),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "student_code": new FormControl('', [Validators.required, Validators.minLength(6)]),
      "academic_program": new FormControl('', [Validators.required]),
      "phone": new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    })

    if (this.student_id) this.loadTeacherData();
  }

  loadTeacherData() {
    const student = this.studentsService.students.find(item => item._id == this.student_id)
    if (student) {
      this.form.patchValue({
        'dni': student.dni,
        'name': student.name,
        'surnames': student.surnames,
        'email': student.email,
        'student_code': student.phone,
        'academic_program': student.academic_program,
        'phone': student.phone
      });
    }
  }


  registerStudent() {

    if (this.form.valid) {

      this.loading = true;

      const data:any = {
        email: this.form.value.email,
        dni: this.form.value.dni,
        name: this.form.value.name,
        surnames: this.form.value.surnames,
        student_code: this.form.value.student_code,
        academic_program: this.form.value.academic_program,
        password: `${this.form.value.dni}`,
        phone: this.form.value.phone
      }
      
      if (this.student_id != '') {
        delete data.password;

        this.httpUtis.updateItem(`/students/${this.student_id}`, data).subscribe({
          next: (response: any) => {

            this.loading = false;

            if (response.valid) {
              const student_index = this.studentsService.students.findIndex((item) => item._id == response.data._id)
              if (student_index > -1) {
                this.studentsService.students[student_index] = response.data;
              }
              this.form.reset()
              this.message = { text: 'El estudiante ha sido actualizado correctamente', status: true }
            } else {
              this.message = { text: 'Ha ocurrido un error, por favor intente nuevamente.', status: false }
            }
            
          },
          error: (error) => {

            this.loading = false;
            console.log(error);

            this.message = { text: 'Ha ocurrido un error al actualizar, por favor intente nuevamente.', status: false }
          }
        });
       
        return;
      }

      this.httpUtis.postItem('/students', data).subscribe({
        next: (response: any) => {
          if (response.valid) {
            this.message = { text: 'Estudiante registrado correctamente', status: true }
            this.studentsService.students.unshift(response.data);
            this.form.reset()
          } else {
            this.message = { text: 'Ha ocurrido un error, por favor intente nuevamente.', status: false }
          }
          this.loading = false;

        },
        error: (error) => {
          this.loading = false;
          console.log(error);
          this.message = { text: 'Ha ocurrido un error, por favor intente nuevamente.', status: false }
        }
      })

    } else {
      this.message = { text: 'Existes campos vacios', status: false }
    }
  }


  getControlError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    if (!control) {
      return false;
    }
    return control.hasError(errorName) && control.touched;
  }

}
