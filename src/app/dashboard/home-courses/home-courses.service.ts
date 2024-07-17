import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/interfaces/interfaces';
import { HttpUtilsService } from 'src/app/shared/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class HomeCoursesService {



  constructor(
    private httpUtis: HttpUtilsService
  ) { }


  fetchCourses(){

    return this.httpUtis.getItem('/courses');
  }


}
