import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../components/modal/modal.component";
import { SidebarComponent } from '../core/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HttpUtilsService } from '../shared/services/http-utils.service';

@Component({
    standalone: true,
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [
      SidebarComponent, 
       
      CommonModule, 
      ModalComponent,
      RouterModule 
    ]
})
export default class DashboardComponent implements OnInit {
  course_active:any;
  loading = false;
  modal = false
  

 
  constructor(
    public appService: AppService,
    private httpUtis: HttpUtilsService,
  
  ) { }

  ngOnInit(): void {
    // let tokenEncript = localStorage.getItem('token') ?? '';
    // let token = decodedAccessToken(tokenEncript)
    //console.log("Token decodificado: ", token);
    // if (this.appService.course_teacher.length == 0) {
    //   console.log("ENTRO EN EL IF PRIMERO");
    //   this.loading=true;
    //   this.httpUtis.getItem(`/api/courses/byTeacher/ndkjadknakddasdsa`).subscribe(
    //     (response: any) => {
    //       if (response.valid) {
    //         console.log("ENTRO EN EL IF");

    //         this.appService.course_teacher = response.data;
    //         this.loading=false;
    //       }

    //     }
    //   )
    // }

  }

  goBack(): void {
    window.history.back();
  }

  

}
