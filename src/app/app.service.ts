import { Injectable } from '@angular/core';
import { HttpService } from './shared/services/http.service';
import { AcademicProgram, User ,Response } from './shared/interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  public token: string = '';
  public academic_programs: AcademicProgram[] = [];
  public userData?: User;
  public showModal: boolean = false;


  constructor(
    private httpService: HttpService,
  ) { }

  startApp() {
    console.log("SE EJECUTO EL START");
    this.getAcademicProgram().subscribe((response) => {
      if (response.valid) {
        this.academic_programs = response.data;
      }

    })


  }

  getAcademicProgram() {
    return this.httpService.getItem('/academic-program');
  }


  











}
