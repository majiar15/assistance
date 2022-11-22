import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  dni: String = '';
  password: String = '';
  message = { text: '', status: false };
  loading=false;
  constructor(
    public router: Router,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  login() {

    if (this.dni && this.password) {
      console.log("Enviar datos: ", this.dni, this.password);
      this.loading=true;
      let data = {
        "email": this.dni,
        "password": this.password
      }
      this.loginService.signIn(data).subscribe({

        next: (response) => {
          if (response.valid) {
            console.log("La respuesta es: ", response);
            this.loginService.isLogged=true;
            
            this.loading=false;
            this.router.navigate(['/home'])
          }
        },
        error: (error) => {
          console.log("Hola",error.status)
          this.loginService.isLogged=false;
          this.loading=false;
          this.message = { text: 'Ha ocurrido un error, recargue la pagina e inténtalo nuevamente', status: false };

        }
      });

    } else {
      this.message = { text: 'Existen campos vacios', status: false };
    }



  }

}
