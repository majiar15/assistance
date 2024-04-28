import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/interfaces/interfaces';
import { HttpUtilsService } from 'src/app/shared/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  public students:User[]=[];

  constructor(private httpUtis: HttpUtilsService) { }

  start(){

    this.httpUtis.getItem('/students').subscribe((response) => {
      if(response.valid){
        this.students=response.data;
      }
      console.log("🚀 ~ StudentsService :", response)

    })
  }
}
