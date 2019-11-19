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
  label:"Cod. Consultora:",
  inputid:"codconsultora",
  inputPlaceHolder:"Código Consultora",
  controlType:'input'
}]

@Component({
  selector: 'app-consulta-op-consultora',
  templateUrl: './consulta-op-consultora.component.html',
  styleUrls: ['./consulta-op-consultora.component.css']
})
export class ConsultaOpConsultoraComponent implements OnInit {

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
    this.somos.consultaOfertaPersonalizadaPorConsultora($event.pais,$event.campana,$event.tipoPersonalizacion, $event.codconsultora).subscribe((response)=>{
    debugger;
    this.verDetalle=true;
    this.dataDetalle=response;
    console.log(response.result);
  },(error)=>{
    console.log(error);
  })
  console.log($event);

  }

}
