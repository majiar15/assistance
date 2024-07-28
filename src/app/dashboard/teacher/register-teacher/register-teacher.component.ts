import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherService } from '../teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService]
})
export class RegisterTeacherComponent implements OnInit {


  public form: FormGroup = new FormGroup({});


  message: any
  loading = false;
  teacher_id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public teacherService: TeacherService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public router: Router,
  ) { }

  ngOnInit(): void {

    if (this.route.snapshot.paramMap.get('id')) {
      this.teacher_id = this.route.snapshot.paramMap.get('id') || '';

    }

    this.form = this.formBuilder.group({
      "dni": new FormControl('', [Validators.required, Validators.min(100000)]),
      "name": new FormControl('', [Validators.required]),
      "surnames": new FormControl('', [Validators.required]),
      "phone": new FormControl('', [Validators.required, Validators.max(10000000000), Validators.min(1000000000)]),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "password": new FormControl('', this.teacher_id ? [] : [Validators.required, Validators.minLength(6)]),
    })

    if (this.teacher_id) this.loadTeacherData();


  }


  loadTeacherData() {
    const teacher = this.teacherService.teachers.data.find(item => item._id == this.teacher_id)
    if (teacher) {
      this.patchFormValues(teacher);
    } else {
      this.teacherService.getTeacher(this.teacher_id).subscribe({
        next: (response) => {
          if (response.valid) {
            this.patchFormValues(response.data);

          }
        },
        error: (err) => {

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

  private patchFormValues(teacher: any): void {
    this.form.patchValue({
      'dni': teacher.dni,
      'name': teacher.name,
      'surnames': teacher.surnames,
      'phone': teacher.phone,
      'email': teacher.email,
      'password': '',
    });
  }

  registerTeacher() {

    if (this.form.valid) {
      this.loading = true;
      const data = { ...this.form.value };

      if (this.teacher_id) {
        this.updateTeacher(data);
      } else {
        this.createTeacher(data);
      }
    } else {
      this.form.markAllAsTouched();
      this.message = { text: 'Existes campos vacios', status: false }
    }
  }



  private createTeacher(data: any) {
    this.teacherService.createTeacher(data).subscribe({
      next: (response: any) => {
        if (response.valid) {


          this.message = { text: 'Profesor registrado correctamente.', status: true }
          response.data['page'] = 1;
          this.teacherService.teachers.data.unshift(response.data)
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


  private updateTeacher(data: any) {
    delete data.password;
    this.teacherService.updateTeacher(this.teacher_id, data).subscribe({
      next: (response: any) => {

        this.loading = false;

        if (response.valid) {


          
            const teacher_index = this.teacherService.teachers.data.findIndex((item) => item._id == response.data._id)
            if (teacher_index > -1) {
              response.data['page'] = this.teacherService.teachers.data[teacher_index].page
              this.teacherService.teachers.data[teacher_index] = response.data;
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





  isControlInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || control.dirty);
  }


}
