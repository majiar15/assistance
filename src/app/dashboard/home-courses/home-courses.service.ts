import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeCoursesService {



  constructor(
    private httpService: HttpService,
  ) { }


  fetchCourses(){

    return this.httpService.getItem('/courses');
  }


}
