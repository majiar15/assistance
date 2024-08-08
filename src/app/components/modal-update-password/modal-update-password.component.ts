import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppService } from 'src/app/app.service';
import { ModalType } from "src/app/shared/enum/modalType";
import { HttpService } from 'src/app/shared/services/http.service';
import { handleError } from 'src/app/util/handleErrors';

@Component({
  standalone:true,
  selector: 'modal-dialog-update-password',
  templateUrl: './modal-update-password.component.html',
  styleUrls: ['./modal-update-password.component.css'],
  imports:[CommonModule,ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService]
  
})
export class ModalUpdatePasswordComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  @Output() closeModalEvent = new EventEmitter<any>();
  public loading:boolean=false;
  message: any;

  constructor(
    private appService:AppService,
    public router: Router,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    
  ) { 
    
  }

  
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      "password": new FormControl('', [Validators.required, Validators.minLength(6)]),
      "new_password": new FormControl('', [Validators.required, Validators.minLength(6)]),
      "confirm_password": new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  close(): void {
    //
  }
  

  updatePassword(){
    if(this.form.valid){
      this.loading=true;
      const data = { ...this.form.value };

      this.httpService.postItem('/auth/update-password',data).subscribe({
        next:(response:any)=>{
          if(response.valid){
            this.loading=false;
           
            this.cancel(true);
            
          }else{
            this.loading=false;
            this.message = { text: response.message, status: false }
            setTimeout(()=>{
              this.message=null;
            },4000)
          }
        },
        error:(err:any)=>{
          this.loading=false;
          this.message = { text: handleError(err), status: false }
          setTimeout(()=>{
            this.message=null;
          },4000)
          console.log("ERROR",err);
          
        }
      })


    }else{
      this.form.markAllAsTouched();
      this.message = { text: 'Existes campos vacios', status: false }
      setTimeout(()=>{
        this.message=null;
      },1500)
      
    }
  }

  cancel(status=false){
    this.closeModalEvent.emit(status);
  }

  isControlInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || control.dirty);
  }

}
