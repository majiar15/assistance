import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public colors = [
    'colorRed', 'colorBlue', 'colorGreen', 'colorYellow',
    'colorSilver', 'colorWhite', 'colorBlack', 'colorRed', 'colorGreen'];

  loading = false;
  modal = false
  constructor(
    public appService: AppService
  ) { }

  ngOnInit(): void {
    let tokenEncript = localStorage.getItem('token') ?? '';
    let token = this.appService.getDecodedAccessToken(tokenEncript)
    console.log("Token decodificado: ", token);
    if (this.appService.course_teacher.length == 0) {
      console.log("ENTRO EN EL IF PRIMERO");
      this.loading=true;
      this.appService.getItem(`/api/cursos/courseByTeacher?teacher_id=${token.user_id}`).subscribe(
        (response: any) => {
          if (response.valid) {
            console.log("ENTRO EN EL IF");

            this.appService.course_teacher = response.data;
            this.loading=false;
          }

        }
      )
    }

  }

  showModal() {


    this.modal = !this.modal;
    console.log('Se ejecuto el click de card desde home', this.modal);
  }

}
