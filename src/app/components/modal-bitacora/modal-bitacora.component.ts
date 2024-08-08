import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ModalType } from "src/app/shared/enum/modalType";
import { BitacoraService } from './modal-bitacora.service';
import { HomeCoursesService } from 'src/app/dashboard/home-courses/home-courses.service';

@Component({
  standalone: true,
  selector: 'modal-dialog-bitacora',
  templateUrl: './modal-bitacora.component.html',
  styleUrls: ['./modal-bitacora.component.css'],
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule]

})
export class ModalBitacoraComponent implements OnInit {

  @Input() modal_type: ModalType = ModalType.SELECT_OPTIONS;
  @Input() course_ID: string = '';
  @Output() closeModalEvent = new EventEmitter<any>();

  messageBitacora = '';
  errorMessage: any;
  loading: boolean = false;
  confirmCheck: boolean = false;
  constructor(
    private appService: AppService,
    private bitacoraService: BitacoraService,
    private homeService: HomeCoursesService,
    public router: Router,
  ) {
  }


  ngOnInit(): void {
  }

  close(): void {
    //this.closeModalEvent.emit(false);
  }




  enviarBitacora() {
    if (this.messageBitacora != '') {
      this.loading = true;
      const data = {
        "courseId": this.homeService.courseInProgress._id,
        "secret": this.createNewSecret(),
        "bitacora": this.messageBitacora,
        "isCancel": this.confirmCheck
      }
      
      this.bitacoraService.createBitacora(data).subscribe((response) => {

        if (response.valid) {

          this.loading = false;
          this.bitacoraService.bitacora = response.data;
          this.homeService.inClass = true;
          this.homeService.startInterval()
          this.bitacoraService.openQRPage(response.data.secret);
          this.closeModalEvent.emit(true);
          
        } else {
          this.errorMessage = { text: 'La bitacora no fue guardarda. intente nuevamente.', status: false }
        }
      })

    } else {
      this.errorMessage = { text: 'La descripcion no puede estar vacia.', status: false }
    }

  }

  createNewSecret(): string {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);

    return Array.from(array, byte => ('0' + byte.toString(16)).slice(-2)).join('');
  }




  defaults_modal = [
    {
      title: 'Seleccione una opcion',
      description: 'Seleccione el proceso que desea realizar.',
      btn: 2
    },
    {
      title: '¿Está seguro que desea eliminar a este profesor?',
      description: `Toda la información del profesor será eliminada permanentemente. Esta acción no se puede deshacer. ¿Confirmar eliminación?`,
      btn: 1
    },
    {
      title: '¿Está seguro que desea eliminar este curso?',
      description: `Toda la información del curso será eliminada permanentemente. Esta acción no se puede deshacer. ¿Confirmar eliminación?`,
      btn: 1
    },
    {
      title: '¿Está seguro que desea eliminar a este Estudiante?',
      description: `Toda la información del estudiante será eliminada permanentemente. Esta acción no se puede deshacer. ¿Confirmar eliminación?`,
      btn: 1
    },

  ]
}
