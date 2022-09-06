import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public items =[
    {
      title: "Introduccion a la ingenieria",
      color: 'colorRed'
    },
    {
      title:"Redes I",
      color: 'colorBlue'
    },
    {
      title:"Calculo diferencial",
      color: 'colorGreen'
    },
    {
      title:"Calculo Integral",
      color: 'colorYellow'
    },
    {
      title:"Ingenieria de software II",
      color: 'colorSilver'
    },
    {
      title:"Web avanzada",
      color: 'colorWhite'
    },
    {
      title:"Movil I",
      color: 'colorBlack'
    },
    {
      title:"Movil II",
      color: 'colorRed'
    },
    {
      title:"Arquitectura de computadores",
      color: 'colorGreen'
    }];

    modal=false
  constructor(
    
  ) { }

  ngOnInit(): void {
  }

  showModal(){
    this.modal=true;
  }

}
