import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  standalone:true,
  selector: 'app-register-teacher',
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
    private appService:AppService
  ) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      "DNI":new FormControl('',[Validators.required,Validators.minLength(6)]),
      "name":new FormControl('',[Validators.required]),
      "surnames":new FormControl('',[Validators.required]),
      "email":new FormControl('',[Validators.required,Validators.email]),
      "password":new FormControl('',[Validators.required,Validators.minLength(6)]),
      

    })
  }

  registerTeacher(){
    
    if(this.form.valid){
      this.loading=true;
      let data={
        email: this.form.value.email,
        DNI: this.form.value.DNI,
        name: `${this.form.value.name} ${this.form.value.surnames}`,
        password: this.form.value.password
      }
      
      const url='/api/teacher';
      this.appService.postItem(url,data).subscribe({
        next:(response:any)=>{
          this.loading=false;
          this.message={text:'Profesor registrado correctamente',status:false}
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
    setTimeout(()=>{
      this.message =null;
    },5000)
  }

  

}
