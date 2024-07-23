
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ModalComponent } from "../modal/modal.component";
import { Metadata } from 'src/app/shared/interfaces/interfaces';
import { DataTable } from 'src/app/shared/interfaces/indexedTable';

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
  @Output() deleteItem: EventEmitter<any> = new EventEmitter();
  @Output() paginationItem: EventEmitter<any> = new EventEmitter();
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  pageFetching: number[] = [];

  constructor(
    private appService: AppService,

  ) { }

  ngOnInit(): void {
    this.totalItems = this.data.length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("🚀 ~ Change", changes)
    if (changes['metadata'].currentValue!=undefined) {
      
      this.pageSize=changes['metadata'].currentValue.limit;
      this.totalItems=changes['metadata'].currentValue.itemCount;
      this.pageFetching.push(this.currentPage);
      }
  }

  getObjectKeys(obj: any): string[] {
    const newObject = { ...obj }; // se utiliza desestructuracion para romper el enlace con el objeto origial
    delete newObject._id;
    delete newObject.page;
    return Object.keys(newObject);
  }



  deleteProperty(data: any) {
    this.deleteItem.emit(data);
  }

  get paginatedData() {
    console.log("🚀 ~  data:",  this.data)
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    let pageDate = this.data.filter((value)=>value.page==this.currentPage);
    
    return pageDate
  }

  get paginationInfo() {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.totalItems);
    return { start, end };
  }


  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginationItem.emit({
        page,
        limit:this.metadata?.limit,
        pageFetching: this.pageFetching
      })
    }
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }

}



