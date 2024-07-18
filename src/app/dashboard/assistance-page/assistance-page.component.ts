import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from 'src/app/core/sidebar/sidebar.component';

@Component({
    standalone: true,
    selector: 'app-assistance-page',
    templateUrl: './assistance-page.component.html',
    styleUrls: ['./assistance-page.component.css'],
    imports: [SidebarComponent]
})
export class AssistancePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
