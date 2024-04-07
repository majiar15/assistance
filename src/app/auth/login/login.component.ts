import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { decodedAccessToken } from 'src/app/util/decodedToken';
import { LoginService } from './login.service';
import { ModalSessionExpiredComponent } from "../../components/modalSessionExpired/modalSessionExpired.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [
      ModalSessionExpiredComponent,
      CommonModule,
      ReactiveFormsModule,
      FormsModule
    ]
})
export class LoginComponent implements OnInit {

  dni: String = '';
  password: String = '';
  message = { text: '', status: false };
  loading=false;
  constructor(
    public router: Router,
    public loginService: LoginService,
    public appService:AppService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['/dashboard'])
    // if (this.dni && this.password) {
    //   console.log("Enviar datos: ", this.dni, this.password);
    //   this.loading=true;
    //   let data = {
    //     "email": this.dni,
    //     "password": this.password
    //   }
    //   this.loginService.signIn(data).subscribe({

    //     next: (response) => {
    //       if (response.valid) {
    //         console.log("La respuesta es: ", response);
    //         this.loginService.isLogged=true;
            
    //         this.loading=false;
    //         let token=decodedAccessToken(localStorage.getItem('token')??'')
    //          if(token?.isAdmin){
    //           this.router.navigate(['/enroll'])
    //          }else{
    //           this.router.navigate(['/home'])
    //          }
            
           
    //       }
    //     },
    //     error: (error) => {
    //       console.log("Hola",error.status)
    //       this.loginService.isLogged=false;
    //       this.loading=false;
    //       this.message = { text: 'Ha ocurrido un error, recargue la pagina e inténtalo nuevamente', status: false };

    //     }
    //   });

    // } else {
    //   this.message = { text: 'Existen campos vacios', status: false };
    // }



  }

  showModal() {

    console.log("F");
    this.loginService.modal = false;
    console.log(this.loginService.modal);
    
  }
}
