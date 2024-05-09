
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ModalComponent } from "../modal/modal.component";

@Component({
    standalone: true,
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    imports: [CommonModule, RouterModule, ModalComponent]
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() titles: string[] = [];
  @Input() filters: string[] = [];
  @Output () deleteItem: EventEmitter<any> = new EventEmitter();

  constructor(
    private appService:AppService,

  ) { }

  ngOnInit(): void {
  }

  getObjectKeys(obj: any): string[] {
    const newObject = {...obj}; // se utiliza desestructuracion para romper el enlace con el objeto origial
    delete newObject._id;
    return Object.keys(newObject);
  }

 

  deleteProperty(data:any){
    this.deleteItem.emit(data);
    
  }






}
