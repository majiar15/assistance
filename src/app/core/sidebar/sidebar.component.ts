import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login/login.service';
import { decodedAccessToken } from 'src/app/util/decodedToken';
import { items_admin, items_teacher } from 'src/app/util/list_sidebar';
import { RouterModule } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
    standalone: true,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    imports: [
      CommonModule, 
      RouterModule
    ]
})
export class SidebarComponent implements OnInit {

  public showMenu: boolean = false;
  public items:any;
  constructor(
    public loginService:LoginService,
    public appService:AppService
  ) { 

  }

  ngOnInit(): void {

    if(this.appService.userData?.role=='admin'){
      this.items=items_admin
    }else{
      this.items=items_teacher
    }

  }

  public openMenu(){
    this.showMenu = !this.showMenu
  }

  logout(){
    this.loginService.logout();
  }
}
