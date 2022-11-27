import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterSubjectService {

  schedule:any[]=[];
  intensity=0;

  constructor(
    private appService:AppService
  ) { }


  asignarCourse(data:any){
    return this.appService.postItem('/api/cursos',data)
  }
}
