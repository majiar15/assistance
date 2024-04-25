import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { decodedAccessToken } from 'src/app/util/decodedToken';
import { CardComponent } from "../components/card/card.component";
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../components/modal/modal.component";
import { SidebarComponent } from '../core/sidebar/sidebar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [
      SidebarComponent, 
      CardComponent, 
      CommonModule, 
      ModalComponent,
      RouterModule 
    ]
})
export class DashboardComponent implements OnInit {
  course_active:any;
  loading = false;
  modal = false
  

 
  constructor(
    public appService: AppService
  ) { }

  ngOnInit(): void {
    // let tokenEncript = localStorage.getItem('token') ?? '';
    // let token = decodedAccessToken(tokenEncript)
    //console.log("Token decodificado: ", token);
    if (this.appService.course_teacher.length == 0) {
      console.log("ENTRO EN EL IF PRIMERO");
      this.loading=true;
      this.appService.getItem(`/api/courses/byTeacher/ndkjadknakddasdsa`).subscribe(
        (response: any) => {
          if (response.valid) {
            console.log("ENTRO EN EL IF");

            this.appService.course_teacher = response.data;
            this.loading=false;
          }

        }
      )
    }

  }

  

}
