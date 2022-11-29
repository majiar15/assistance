import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  fecha_actual:any;
  constructor(
    public appService:AppService,
  ) {
    let fecha=Date.now();
    this.fecha_actual=moment(fecha).format('DD-MM-YYYY');
   }

  ngOnInit(): void {

    console.log("fecha actual ",this.fecha_actual);
    
  }

}
