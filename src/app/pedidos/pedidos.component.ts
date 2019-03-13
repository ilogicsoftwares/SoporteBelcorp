import { Component, OnInit, ViewChild } from '@angular/core';
import { Inputcontrol } from '../models/inputcontrol.model';
import { SomosbelcorpService } from '../somosbelcorp.service';
import { TableComponent } from '../forms/table/table.component';

let controles=[{
  label:"País:",
  inputid:"pais",
  inputPlaceHolder:"Codigo País"
},{
  label:"Campaña:",
  inputid:"campana",
  inputPlaceHolder:"Campaña"
},{
  label:"Consultora ID:",
  inputid:"consultora",
  inputPlaceHolder:"Consultora ID"
}]

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
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
    this.somos.cosultarPedido($event.pais,$event.campana,$event.consultora).subscribe((response)=>{
 
      this.verDetalle=true;
      this.dataDetalle=this.somos.convertTableToObject(response);
      console.log(response);
    },(error)=>{
      console.log(error);
    })
    console.log($event);
  }



}
