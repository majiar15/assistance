import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpUtilsService } from 'src/app/shared/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  schedule:any[]=[];
  intensity=0;
  intensityBefore=0
  constructor(
    private appService:AppService,
    private httpUtis: HttpUtilsService
  ) { }


  asignarCourse(data:any){
    return this.httpUtis.postItem('/api/cursos',data)
  }
}
