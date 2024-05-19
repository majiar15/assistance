import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';


@Component({
  standalone:true,
  selector: 'modal-dialog',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports:[CommonModule]
  
})
export class ModalComponent implements OnInit {

  @Input() modal_type:number = 0;
  @Input() course_ID: string = '';
  @Input() buttons:Array<any> =[];
  @Output() button1Event = new EventEmitter<any>();
  @Output() button2Event = new EventEmitter<any>();

  constructor(
    private appService:AppService,
    public router: Router,
  ) { 
    
  }

  
  ngOnInit(): void {
  }

  close(): void {
    //this.closeModalEvent.emit(false);
  }
  buttonPrimary(){
    console.log("🚀 ~ buttonPrimary:",)
    //this.router.navigate([`/view-assistance/${this.course_ID}`,])
    this.button1Event.emit()
  }
  buttonSecondary(){
    console.log("buttonSecondary");
    this.button2Event.emit()
    //this.router.navigate([`/assistance/${this.course_ID}`,])
    
  }



  defaults_modal=[
    {
      title:'Seleccione una opcion',
      description:'Seleccione el proceso que desea realizar.',
      btn:2
    },
    {
      title:'¿Está seguro que desea eliminar a este profesor?',
      description:`Toda la información del profesor será eliminada permanentemente. Esta acción no se puede deshacer. ¿Confirmar eliminación?`,
      btn:1
    },
    {
      title:'¿Está seguro que desea eliminar este curso?',
      description:`Toda la información del curso será eliminada permanentemente. Esta acción no se puede deshacer. ¿Confirmar eliminación?`,
      btn:1
    },
    
  ]
}
