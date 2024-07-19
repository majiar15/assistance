
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ModalComponent } from "../modal/modal.component";
import { Metadata } from 'src/app/shared/interfaces/interfaces';

@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [CommonModule, RouterModule, ModalComponent]
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() metadata: Metadata | undefined = undefined;
  @Input() titles: string[] = [];
  @Input() filters: string[] = [];
  @Output() deleteItem: EventEmitter<any> = new EventEmitter();
  @Output() paginationItem: EventEmitter<any> = new EventEmitter();

  currentPage = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(
    private appService: AppService,

  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['metadata']!=undefined) {
      console.log("🚀 ~ TableComponent ~ ngOnChanges ~ changes['metadata']:", changes['metadata'])
      this.pageSize=changes['metadata'].currentValue.limit;
      this.totalItems=changes['metadata'].currentValue.itemCount;
    }
  }

  getObjectKeys(obj: any): string[] {
    const newObject = { ...obj }; // se utiliza desestructuracion para romper el enlace con el objeto origial
    delete newObject._id;
    return Object.keys(newObject);
  }



  deleteProperty(data: any) {
    this.deleteItem.emit(data);

  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.data.slice(start, end);
  }

  get paginationInfo() {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.totalItems);
    return { start, end };
  }


  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginationItem.emit({page,limit:this.metadata?.limit})
    }
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

