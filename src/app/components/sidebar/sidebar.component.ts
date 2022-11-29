import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/pages/login/login.service';
import { decodedAccessToken } from 'src/app/util/decodedToken';
import { items_admin, items_teacher } from 'src/app/util/list_sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public showMenu: boolean = false;
  public items:any;
  constructor(
    public loginService:LoginService
  ) { 

  }

  ngOnInit(): void {

    let token=decodedAccessToken(localStorage.getItem('token')??'')
    if(token?.isAdmin){
      this.items=items_admin
    }else{
      this.items=items_teacher
    }

  }

  public openMenu(){
    this.showMenu = !this.showMenu
  }

  logout(){
    this.loginService.isLogged=false;
    localStorage.clear()
  }
}
