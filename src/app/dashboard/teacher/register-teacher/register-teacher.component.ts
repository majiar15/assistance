import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { HttpUtilsService } from 'src/app/shared/services/http-utils.service';
import { TeacherService } from '../teacher.service';

@Component({
  standalone:true,
  selector: 'register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css'],
  imports:[CommonModule,ReactiveFormsModule ]
})
export class RegisterTeacherComponent implements OnInit {


  public form:FormGroup=new FormGroup({});


  message:any
  loading=false;
  
  constructor(
    private formBuilder:FormBuilder,
    private httpUtis: HttpUtilsService,
    public teacherService:TeacherService,
  ) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      "dni":new FormControl('',[Validators.required,Validators.minLength(6)]),
      "name":new FormControl('',[Validators.required]),
      "surnames":new FormControl('',[Validators.required]),
      "phone":new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
      "email":new FormControl('',[Validators.required,Validators.email]),
      "password":new FormControl('',[Validators.required,Validators.minLength(6)]),
      

    })
  }

  registerTeacher(){
    
    if(this.form.valid){
      this.loading=true;
      let data={
        email: this.form.value.email,
        dni: this.form.value.dni,
        name: `${this.form.value.name} ${this.form.value.surnames}`,
        password: this.form.value.password,
        phone:this.form.value.phone
      }
    
      this.httpUtis.postItem('/teachers',data).subscribe({
        next:(response:any) => {   

          this.loading=false;

          if(response.valid){
            
            this.message={text:'Profesor registrado correctamente',status:true}
            this.teacherService.teachers.unshift(response.data)
            this.form.reset()

          }else{
            this.message={text:'Ha ocurrido un error, por favor intente nuevamente.',status:false}
          }  

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
    // setTimeout(()=>{
    //   this.message =null;
    // },5000)
  }

  

}
