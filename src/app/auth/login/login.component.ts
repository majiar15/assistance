import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { decodedAccessToken } from 'src/app/util/decodedToken';
import { LoginService } from './login.service';
import { ModalSessionExpiredComponent } from "../../components/modalSessionExpired/modalSessionExpired.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { handleLoginError } from 'src/app/util/handleErrors';

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

  public dni: string = '';
  public password: string = '';
  public message = { text: '', status: false };
  public errorMessages: Array<any> = []
  loading = false;
  constructor(
    public router: Router,
    public loginService: LoginService,
    public appService: AppService,
  ) { }

  ngOnInit(): void {
  }

  signIn() {
    if (this.validateCredetials()) {
      return;
    }
    this.loading = true;
    let data = {
      "dni": parseInt(this.dni),
      "password": this.password
    }
    this.loginService.signIn(data).subscribe({

      next: (response) => {
        if (response.valid) {
          console.log("La respuesta es: ", response);
          this.loginService.isLogged = true;
          this.appService.userData=response.data;
          this.loading = false;

          if (response.data.role=='admin') {
            this.router.navigate(['/dashboard'])
          } else {
            this.router.navigate(['/dashboard'])
          }


        }
      },
      error: (err) => {
        console.log("🚀 ~ LoginComponent ~ this.loginService.signIn ~ error:", err)
        const error =handleLoginError(err.error)
        this.loginService.isLogged = false;
        this.loading = false;
        this.message = { text: error, status: false };

      }
    });



  }

  validateCredetials() {
    this.errorMessages = [];
    if (!this.dni || this.dni.trim() === '') {
      this.errorMessages.push({ field: 'username', message: 'El usuario se encuentra vacío.' })
    } else if (this.dni.length < 5) {
      this.errorMessages.push({ field: 'username', message: 'El usuario no es válido, intenta nuevamente.' })
    }
    if (!this.password || this.password.trim() === '') {
      this.errorMessages.push({ field: 'password', message: 'La contraseña esta vacía.' })
    } else if (this.password.length < 5) {
      this.errorMessages.push({ field: 'password', message: 'La contraseña debe tener al menos 5 caracteres.' })
    }
    return this.errorMessages.length ? true : false;
  }

 

  showModal() {

    console.log("F");
    this.loginService.modal = false;
    console.log(this.loginService.modal);

  }
}
