import { Injectable } from '@angular/core';
import { Student, User } from 'src/app/shared/interfaces/interfaces';
import { HttpUtilsService } from 'src/app/shared/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  public students:Student[]=[];

  constructor(private httpUtis: HttpUtilsService) { }

  start(){

    this.httpUtis.getItem('/students').subscribe((response) => {
      if(response.valid){
        this.students=response.data;
      }
    })
   
  }

}
