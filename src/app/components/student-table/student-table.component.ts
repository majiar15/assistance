import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  standalone:true,
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css'],
  imports:[CommonModule ]
})
export class StudentTableComponent implements OnInit {

  fecha_actual
  hora_actual:any;
  course_id:any;

  estudiantes_asistencia:any[]=[];

  constructor(
    public appService:AppService,
    private httpService: HttpService,
    private route:ActivatedRoute,
  ) {
    let fecha=Date.now();
    this.fecha_actual=moment(fecha).format('YYYY-MM-DD');
    this.hora_actual=moment(fecha).format('HH:mm');
   }

  ngOnInit(): void {
    this.course_id=this.route.snapshot.paramMap.get('id');
    console.log("fecha actual ",this.fecha_actual);

    this.httpService.getItem(`/api/estudiante/asistencia/${this.course_id}`).subscribe(
      (response:any)=>{

        if(response.valid){
          this.appService.student_assitance=response.data;

          this.httpService.getItem(`/api/assistance/${this.fecha_actual}/${this.course_id}`).subscribe(
            (response:any)=>{
              if(response.valid){
                response.data.forEach((element:any) => {
                  console.log(element);
                  
                  let index=this.appService.student_assitance.findIndex(item=>item.student_id==element.student_id);
                  console.log(index);
                  if(index!=-1){
                    this.appService.student_assitance[index].estado=true;
                  }
                });
                
              }
            }
          )
          
        }
      }
      )
    
    
    
  }

  takeAttendance(student:any){

    let data={
      student_id:student.student_id,
      course_id:this.course_id
    }

    this.httpService.postItem('/api/assistance',data).subscribe(
      (response:any)=>{
        if(response.valid){
          this.appService.student_assitance.map((item:any)=>{
            if(item.student_id==student.student_id){
              item['estado']=true;
            }
            return item
          })
        }
      }
    )
    

  }

}
