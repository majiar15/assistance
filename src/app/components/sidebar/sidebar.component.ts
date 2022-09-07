import { Component, OnInit } from '@angular/core';

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
      link: 'techer'
    }
  ];
  constructor() { 

  }

  ngOnInit(): void {
  }

  public openMenu(){
    this.showMenu = !this.showMenu
  }

}
