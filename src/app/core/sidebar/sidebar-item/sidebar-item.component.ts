import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.css'],
  imports:[CommonModule]
})
export class SidebarItemComponent implements OnInit {
  @Input() title: string = '';
  @Input() classIcono: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
