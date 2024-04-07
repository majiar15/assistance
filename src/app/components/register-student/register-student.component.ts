import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  standalone:true,
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css'],
  imports:[CommonModule,ReactiveFormsModule ]
})
export class RegisterStudentComponent implements OnInit {


  public form:FormGroup=new FormGroup({});
  
  loading=false
  message:any
  constructor(
    private formBuilder:FormBuilder,
    private appService:AppService
  ) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      "DNI":new FormControl('',[Validators.required,Validators.minLength(6)]),
      "name":new FormControl('',[Validators.required]),
      "surnames":new FormControl('',[Validators.required]),
      "email":new FormControl('',[Validators.required,Validators.email]),
      "carnet_estudiante":new FormControl('',[Validators.required,Validators.minLength(6)]),
      

    })
  }

  registerStudent(){

    if(this.form.valid){
      this.loading=true;
      let data={
        email: this.form.value.email,
        DNI: this.form.value.DNI,
        nombre: `${this.form.value.name} ${this.form.value.surnames}`,
        carnet_estudiante: this.form.value.carnet_estudiante
      }
      const url='/api/estudiante';
      this.appService.postItem(url,data).subscribe({
        next:(response:any)=>{
          this.loading=false;
          this.message={text:'Estudiante registrado correctamente',status:false}
        },
        error:(error)=>{
          this.loading=false;
          console.log(error);
          this.message={text:'Ha ocurrido un error, por favor intente nuevamente.',status:false}
        }
      })
    }
  }

}
