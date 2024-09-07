import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {

  constructor(private httpService: HttpService) {}

  downloadExcel(course_id: string): Observable<Blob> {

    return this.httpService.getItemBlob(`/reports/download/reports-students/${course_id}`);
  }
}
