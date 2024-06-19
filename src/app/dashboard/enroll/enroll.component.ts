import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css'],
  imports: [RouterModule]
  

})
export class EnrollComponent implements OnInit {


  constructor(
  ) { }
  ngOnInit(): void {
    
  }
  
}
