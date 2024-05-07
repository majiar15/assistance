
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({

  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports:[CommonModule, RouterModule],
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() titles: string[] = [];
  @Input() filters: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  getObjectKeys(obj: any): string[] {
    const newObject = {...obj}; // se utiliza desestructuracion para romper el enlace con el objeto origial
    delete newObject._id;
    return Object.keys(newObject);
  }




}
