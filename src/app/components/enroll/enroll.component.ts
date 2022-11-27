import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {

  message:any;
  loading=false;
  public form:FormGroup=new FormGroup({});
  constructor(
    private formBuilder:FormBuilder,
    public appService:AppService,
  ) { }

  ngOnInit(): void {

    if(this.appService.courses.length==0){
      this.appService.getItem('/api/cursos').subscribe((response:any)=>{
        if(response.valid){
          this.appService.courses=response.data
        }
      })
    }

    this.form=this.formBuilder.group({
      "DNI_student":new FormControl('',[Validators.required,Validators.minLength(6)]),
      "course_id":new FormControl('',[Validators.required]),
    
      

    })
  }
  enroll(){

    console.log("Enroll:  ",this.form.value);
    
    if(this.form.valid){

      this.loading=true;
      this.appService.postItem('/api/admin/enroll',this.form.value).subscribe({
        next:(response:any)=>{
          this.loading=false;
          this.message={text:'Estudiante matriculado correctamente',status:true}
          this.form.reset()
        },
        error:(error)=>{
          this.loading=false;
          console.log(error);
          this.message={text:'Ha ocurrido un error, por favor intente nuevamente.',status:false}
        }
      })
    }else{
      this.message={text:'Existen campos vacios.',status:false}
    }

    setTimeout(() => {
      this.message=null;
    }, 3000);
  }
}
