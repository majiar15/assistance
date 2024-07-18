import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { SidebarComponent } from 'src/app/core/sidebar/sidebar.component';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
    standalone: true,
    selector: 'app-assistance-view-page',
    templateUrl: './assistance-view-page.component.html',
    styleUrls: ['./assistance-view-page.component.css'],
    imports: [SidebarComponent]
})
export class AssistanceViewPageComponent implements OnInit {


  fecha:String='';
  course_id:any;
  constructor(
    public appService:AppService,
    private route:ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {

    this.course_id=this.route.snapshot.paramMap.get('id');

  }

  searchAssitance(event:any){
    let fecha=event.target.value
    console.log("Datos de la fecha: ",);

    this.httpService.getItem(`/api/assistance/${fecha}/${this.course_id}`).subscribe(
      (response:any)=>{
        if(response.valid){
          this.appService.student_assitance=response.data

          this.appService.student_assitance.map((item:any)=>{
            item.estado=true;
            return item
          })
        }
        
    
      })
  }

}
