import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherService } from '../teacher.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
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
      "phone": new FormControl('', [Validators.required, Validators.max(9000000000), Validators.min(1000000000)]),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "password": new FormControl('', this.teacher_id ? [] : [Validators.required, Validators.minLength(6)]),
    })

    if (this.teacher_id) this.loadTeacherData();


  }

  loadTeacherData() {
    const teacher = this.teacherService.teachers.find(item => item._id == this.teacher_id)
    if (teacher) {

      this.form.patchValue({
        'dni': teacher.dni,
        'name': teacher.name,
        'surnames': teacher.surnames,
        'phone': teacher.phone,
        'email': teacher.email,
        'password': '',
      });
    }
  }

  getControlError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    if (!control) {
      return false;
    }
    return control.hasError(errorName) && control.touched;
  }

  registerTeacher() {
    console.log("🚀 ~ this.form:", this.form)
    if (this.form.valid) {

      this.loading = true;
      const data = { ...this.form.value };



      if (this.teacher_id != '') {
        delete data.password;

        this.teacherService.updateTeacher(this.teacher_id, data).subscribe({
          next: (response: any) => {

            this.loading = false;

            if (response.valid) {
              const teacher_index = this.teacherService.teachers.findIndex((item) => item._id == response.data._id)
              if (teacher_index > -1) {
                this.teacherService.teachers[teacher_index] = response.data;
              }

              this.message = { text: 'Profesor ha sido actualizado correctamente', status: true }
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
        this.form.reset()
        setTimeout(() => {
          
        }, 5000)
        return;

      }

      this.teacherService.createTeacher(data).subscribe({
        next: (response: any) => {

          this.loading = false;

          if (response.valid) {

            this.message = { text: 'Profesor registrado correctamente', status: true }
            this.teacherService.teachers.unshift(response.data)
            this.form.reset()

          } else {
            this.message = { text: 'Ha ocurrido un error, por favor intente nuevamente.', status: false }
          }

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
    // setTimeout(()=>{
    //   this.message =null;
    // },5000)
  }

}
