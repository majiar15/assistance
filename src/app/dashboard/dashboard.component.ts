import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../components/modal/modal.component";
import { SidebarComponent } from '../core/sidebar/sidebar.component';
import { Router, RouterModule } from '@angular/router';

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
      
    ],
})
export default class DashboardComponent {
  course_active:any;
  loading = false;

  constructor(
    public appService: AppService,
    private router: Router
  ) {
   }


  goBack(): void {
    window.history.back();
  }
  canBack(): boolean{
    return this.router.url !== '/dashboard'
  }
}
