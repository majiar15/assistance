import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { Response,User } from 'src/app/shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  public teachers:Response<User> = {data:[],valid:false};

  constructor(
    private httpService: HttpService
  ) {}

  public createTeacher(data: any): Observable<any> {
    return this.httpService.postItem('/teachers',data)
  }

  public updateTeacher(teacher_id:string,data:any){
    return this.httpService.updateItem(`/teachers/${teacher_id}`,data)
  }

  public deleteTeacher(teacher_id:string){
    return this.httpService.deleteItem(`/teachers/${teacher_id}`)
  }

  public getTeachers(): Observable<Response<User>>{
    return this.httpService.getItem('/teachers');
  }
  public getMoreTeachers(page:number,limit:number): Observable<Response<User>>{
    return this.httpService.getItem(`/teachers?page=${page}&limit=${limit}`);
  }


}
