import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/shared/interfaces/interfaces';
import { HttpUtilsService } from 'src/app/shared/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  public teachers:User[]=[];

  constructor(
    private httpUtis: HttpUtilsService
  ) { }


  start(){

    this.httpUtis.getItem('/teachers').subscribe((response) => {
      if(response.valid){
        this.teachers=response.data;
      }
      console.log("🚀 ~ TeacherService :", response)

    })
  }


}
