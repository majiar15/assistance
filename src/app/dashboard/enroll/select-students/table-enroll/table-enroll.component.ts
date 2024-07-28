import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { TableEnrollType } from 'src/app/shared/enum/modalType';
import { Metadata } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'table-enroll',
  standalone: true,
  imports: [],
  templateUrl: './table-enroll.component.html',
  styleUrl: './table-enroll.component.css'
})
export class TableEnrollComponent {

  titles = ["Documento de identidad", "Nombre", "Facultad", "Programa"];
  tableType= TableEnrollType;
  @Input() students: any[] = [];
  @Input() type:TableEnrollType = TableEnrollType.LIST_STUDENT;
  @Input() metadata: Metadata | undefined = undefined;

  @Output() buttonItem: EventEmitter<any> = new EventEmitter();
  @Output() paginationItem: EventEmitter<any> = new EventEmitter();

  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;
  pageFetching: number[] = [];

  constructor(){}


  ngOnChanges(changes: SimpleChanges): void {

    if (changes['metadata'] && changes['metadata'].currentValue!=undefined) {
      
      this.pageSize=changes['metadata'].currentValue.limit;
      this.totalItems=changes['metadata'].currentValue.itemCount;
      this.totalPages=changes['metadata'].currentValue.pageCount;
      this.pageFetching.push(this.currentPage);
      }
  }

  getObjectKeys(obj: any): string[] {
    const newObject = { ...obj }; // se utiliza desestructuracion para romper el enlace con el objeto origial
    delete newObject._id;
    delete newObject.page;
    return Object.keys(newObject);
  }

  buttonEmit(student: any): void {
    this.buttonItem.emit(student)
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    
    let pageDate = this.students.filter((value)=>value.page==this.currentPage);
    
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
        pageFetching: this.pageFetching,
        type:this.type
      })
    }
  }
}
