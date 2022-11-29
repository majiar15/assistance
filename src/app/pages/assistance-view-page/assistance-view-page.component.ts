import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-assistance-view-page',
  templateUrl: './assistance-view-page.component.html',
  styleUrls: ['./assistance-view-page.component.css']
})
export class AssistanceViewPageComponent implements OnInit {

  constructor(
    public appService:AppService,
  ) { }

  ngOnInit(): void {

    

  }

}
