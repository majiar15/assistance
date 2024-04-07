import { Component, OnInit } from '@angular/core';
import { EnrollComponent } from "../../components/enroll/enroll.component";
import { SidebarComponent } from 'src/app/core/sidebar/sidebar.component';

@Component({
    standalone: true,
    selector: 'app-enroll-page',
    templateUrl: './enroll-page.component.html',
    styleUrls: ['./enroll-page.component.css'],
    imports: [SidebarComponent, EnrollComponent]
})
export class EnrollPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
