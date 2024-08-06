import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ModalType } from "src/app/shared/enum/modalType";

@Component({
  standalone:true,
  selector: 'modal-dialog-bitacora',
  templateUrl: './modal-bitacora.component.html',
  styleUrls: ['./modal-bitacora.component.css'],
  imports:[CommonModule,
    ReactiveFormsModule,
    FormsModule]
  
})
export class ModalBitacoraComponent implements OnInit {
  
  @Input() modal_type:ModalType = ModalType.SELECT_OPTIONS;
  @Input() course_ID: string = '';
  
  messageBitacora='';

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
    
  }
  buttonSecondary(){
    console.log("buttonSecondary");
    
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
    {
      title:'¿Está seguro que desea eliminar a este Estudiante?',
      description:`Toda la información del estudiante será eliminada permanentemente. Esta acción no se puede deshacer. ¿Confirmar eliminación?`,
      btn:1
    },
    
  ]
}
