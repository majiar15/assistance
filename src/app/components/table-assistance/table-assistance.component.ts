
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ModalComponent } from "../modal/modal.component";

@Component({
    standalone: true,
    selector: 'app-table-assistance',
    templateUrl: './table-assistance.component.html',
    styleUrls: ['./table-assistance.component.css'],
    imports: [CommonModule, RouterModule, ModalComponent]
})
export class TableAssistanceComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() titles: string[] = [];
  @Input() filters: string[] = [];
  @Input() isLoading = false;
  @Output () actionItem: EventEmitter<any> = new EventEmitter();
  @Output () selectStudentEvent: EventEmitter<any> = new EventEmitter();

  showModal:boolean = false;
  modal_type:number = 0;
  modal_buttons:Array<any> = [];
  data_delete:any;
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

  deleteConfirmProperty(data:any){
    this.data_delete=data;
    this.modal_type=1;
    this.showModal=true;
    this.modal_buttons=[
      {
        name:'Eliminar'
      },
      {
        name:'Cancelar'
      }, 
    ]
    console.log("DATA DELETE: ",data);
    
  }


  cancel(){
    this.data_delete=null;
    this.modal_type=0;
    this.showModal=false;
    this.modal_buttons=[]
  }


  actionClick(record:any){
    this.actionItem.emit(record);
  }

  selectStudent(record:any){
    this.selectStudentEvent.emit(record)
  }

}