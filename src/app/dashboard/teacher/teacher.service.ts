import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  public teachers:User[]=[];

  constructor(
    private httpService: HttpService
  ) { }


  start(){

    this.httpService.getItem('/teachers').subscribe((response) => {
      if(response.valid){
        this.teachers=response.data;
      }
    })
  }

  public createTeacher(data: any): Observable<any> {
    return this.httpService.postItem('/teachers',data)
  }

  public updateTeacher(teacher_id:string,data:any){
    return this.httpService.updateItem(`/teachers/${teacher_id}`,data)
  }

  public deleteTeacher(teacher_id:string){
    return this.httpService.deleteItem(`/teachers/${teacher_id}`)
  }


}
