import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { HttpUtilsService } from 'src/app/shared/services/http-utils.service';
import { StudentsService } from '../students.service';
import { ActivatedRoute } from '@angular/router';

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
    private httpUtis: HttpUtilsService,
    private studentsService: StudentsService,
    public appService: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    console.log("🚀 ~ROUTE:", this.route)
    // if(){

    // }



    this.form=this.formBuilder.group({
      "dni":new FormControl('',[Validators.required,Validators.minLength(6)]),
      "name":new FormControl('',[Validators.required]),
      "surnames":new FormControl('',[Validators.required]),
      "email":new FormControl('',[Validators.required,Validators.email]),
      "student_code":new FormControl('',[Validators.required,Validators.minLength(6)]),
      "academic_program_id":new FormControl('',[Validators.required]),
      "phone":new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
    })
  }
    

  registerStudent(){

    if(this.form.valid){
      this.loading=true;
      let data={
        email: this.form.value.email,
        dni: this.form.value.dni,
        name: this.form.value.name,
        surnames: this.form.value.surnames,
        student_code: this.form.value.student_code,
        academic_program_id:this.form.value.academic_program_id,
        password:`${this.form.value.dni}`,
        phone:this.form.value.phone
      }
      console.log("🚀 ~  data:", data)
    
      this.httpUtis.postItem('/students',data).subscribe({
        next:(response:any)=>{
          if(response.valid){
            this.message={text:'Estudiante registrado correctamente',status:true}
            this.studentsService.students.unshift(response.data);
            this.form.reset()
          }else{
            this.message={text:'Ha ocurrido un error, por favor intente nuevamente.',status:false}
          }
          this.loading=false;
          
        },
        error:(error)=>{
          this.loading=false;
          console.log(error);
          this.message={text:'Ha ocurrido un error, por favor intente nuevamente.',status:false}
        }
      })
    }else{
      this.message={text:'Existes campos vacios',status:false}
    }
  }

}
