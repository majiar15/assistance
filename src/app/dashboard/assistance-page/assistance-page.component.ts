import { Component, OnInit } from '@angular/core';
import { StudentTableComponent } from "../../components/student-table/student-table.component";
import { SidebarComponent } from 'src/app/core/sidebar/sidebar.component';

@Component({
    standalone: true,
    selector: 'app-assistance-page',
    templateUrl: './assistance-page.component.html',
    styleUrls: ['./assistance-page.component.css'],
    imports: [SidebarComponent, StudentTableComponent]
})
export class AssistancePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
