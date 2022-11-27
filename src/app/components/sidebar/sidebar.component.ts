import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/pages/login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public showMenu: boolean = false;
  public items = [
    {
      title: 'Asistencia',
      class: 'bi bi-book',
      link: 'home'
    },
    {
      title: 'Matriculas',
      class: 'bi bi-book',
      link: 'enroll'
    },
    {
      title: 'Asignatura',
      class: 'bi bi-book',
      link: 'register-subject'
    },
    {
      title: 'Alumnos',
      class: 'bi bi-person',
      link: 'register'
    },
    {
      title: 'Profesores',
      class: 'bi bi-book',
      link: 'register-teacher'
    }
  ];
  constructor(
    public loginService:LoginService
  ) { 

  }

  ngOnInit(): void {
  }

  public openMenu(){
    this.showMenu = !this.showMenu
  }

  logout(){
    this.loginService.isLogged=false;
    localStorage.clear()
  }
}
