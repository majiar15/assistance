import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../components/modal/modal.component";
import { SidebarComponent } from '../core/sidebar/sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { ModalUpdatePasswordComponent } from "../components/modal-update-password/modal-update-password.component";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    standalone: true,
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [
    SidebarComponent,
    CommonModule,
    ModalComponent,
    RouterModule,
    ModalUpdatePasswordComponent,
    ToastModule
],
providers: [MessageService]
})
export default class DashboardComponent implements OnInit {
  course_active:any;
  loading = false;
  public showModalupdatePassword: boolean = false;

  constructor(
    public appService: AppService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    // let tokenEncript = localStorage.getItem('token') ?? '';
    // let token = decodedAccessToken(tokenEncript)
    //console.log("Token decodificado: ", token);
    // if (this.appService.course_teacher.length == 0) {
    //   console.log("ENTRO EN EL IF PRIMERO");
    //   this.loading=true;
    //   this.httpService.getItem(`/api/courses/byTeacher/ndkjadknakddasdsa`).subscribe(
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
  updatePassword(){
    console.log("CAMBIAR CONTRSEÑA");
    this.showModalupdatePassword=true;
  }

  closeModal(event:any){
    if(event){
      this.messageService.add({
        severity: 'success',
        summary: 'Contraseña cambiada.',
        detail: 'La contraseña se cambio correctamente.'
      });
    }
    this.showModalupdatePassword=false;
  }

  goBack(): void {
    window.history.back();
  }
  canBack(): boolean{
    return this.router.url !== '/dashboard'
  }
}
