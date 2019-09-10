import { Component, OnInit, ViewChild } from '@angular/core';
import { Inputcontrol } from '../../models/inputcontrol.model';
import { SomosbelcorpService } from '../../somosbelcorp.service';
import { TableComponent } from '../../forms/table/table.component';

let controles=[{
  label:"País:",
  inputid:"pais",
  inputPlaceHolder:"Codigo País",
  controlType:'input',
},{
  label:"Campaña:",
  inputid:"campana",
  inputPlaceHolder:"Campaña",
  controlType:'input'
},{
  label:"Palanca:",
  inputid:"tipoPersonalizacion",
  inputPlaceHolder:"Tipo Personalización",
  controlType:'input'
},{
  label:"CUV:",
  inputid:"cuv",
  inputPlaceHolder:"CUV",
  controlType:'input'
}]

@Component({
  selector: 'app-oferta-personalizada',
  templateUrl: './oferta-personalizada.component.html',
  styleUrls: ['./oferta-personalizada.component.css']
})
export class OfertaPersonalizadaComponent implements OnInit {
  inputs:any[];
  dataDetalle;
  @ViewChild('tbl') table: TableComponent;
  verDetalle:boolean=false;
  constructor(private somos:SomosbelcorpService) { 
    this.inputs=controles;
  }

  ngOnInit() {
  }

  getParams($event){
    this.somos.consultaOfertaPersonalizada($event.pais,$event.campana,$event.tipoPersonalizacion, $event.cuv).subscribe((response)=>{

    this.verDetalle=true;
    this.dataDetalle=this.somos.convertResultToObject(response);
    console.log(response);
  },(error)=>{
    console.log(error);
  })
  console.log($event);
}

}
