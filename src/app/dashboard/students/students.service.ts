import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Student, Response } from 'src/app/shared/interfaces/interfaces';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  public students:Response<Student>= {data:[],valid:false};

  constructor(private httpService: HttpService) { }

  public createStudent(data: any): Observable<any> {
    return this.httpService.postItem('/students',data)
  }

  public updateStudent(teacher_id:string,data:any){
    return this.httpService.updateItem(`/students/${teacher_id}`,data)
  }

  public deleteStudent(teacher_id:string){
    return this.httpService.deleteItem(`/students/${teacher_id}`)
  }

  public getStudent(): Observable<Response<Student>>{
    return this.httpService.getItem('/students');
  }
  public getMoreStudent(page:number,limit:number): Observable<Response<Student>>{
    return this.httpService.getItem(`/students?page=${page}&limit=${limit}`);
  }


}
