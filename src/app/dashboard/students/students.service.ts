import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Student, User } from 'src/app/shared/interfaces/interfaces';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  studentsSubject = new Subject<Student[]>();
  public students:Student[]=[];

  constructor(private httpService: HttpService) { }

  start(){

    this.httpService.getItem('/students').subscribe((response) => {
      if(response.valid){
        this.students=response.data;
        this.studentsSubject.next(this.students);
      }
    })
   
  }

}
