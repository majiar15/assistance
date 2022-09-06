import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public items = [
    {
      title: 'Asistencia',
      class: 'bi bi-book'
    },
    {
      title: 'Asignatura',
      class: 'bi bi-book'
    },
    {
      title: 'Alumnos',
      class: 'bi bi-book'
    },
    {
      title: 'Profesores',
      class: 'bi bi-book'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
