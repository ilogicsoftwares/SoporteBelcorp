import { Component, OnInit, ViewChild } from '@angular/core';
import { Inputcontrol } from '../models/inputcontrol.model';
import { SomosbelcorpService } from '../somosbelcorp.service';
import { TableComponent } from '../forms/table/table.component';

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
  label:"Consultora ID:",
  inputid:"consultora",
  inputPlaceHolder:"Consultora ID",
  controlType:'input'
}]

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  inputs:any[];
  dataDetalle;
  dataSet;
  dataSetDetalle;

  @ViewChild('tbl') table: TableComponent;
  verDetalle:boolean=false;
  constructor(private somos:SomosbelcorpService) { 
    this.inputs=controles;
  }

  ngOnInit() {
  }

  getParams($event){

      const pais = this.somos.getBD($event.pais);
      this.somos.cosultarPedidoDetalle(pais,$event.campana,$event.consultora).subscribe((response)=>{
      this.verDetalle=true;
      this.dataDetalle=this.somos.convertTableToObject(response);
      console.log(response);
      //pedidowebSet
      this.somos.consultarPedidoSet(pais,this.dataDetalle[0].PedidoID).subscribe((response2)=>{
 
        this.verDetalle=true;
        this.dataSet=this.somos.convertTableToObject(response2);
        console.log(response2);
      },(error)=>{
        console.log(error);
      })
      console.log($event);
      this.somos.consultarPedidoSetDetalle(pais,this.dataDetalle[0].PedidoID).subscribe((response3)=>{
 
        this.verDetalle=true;
        this.dataSetDetalle=this.somos.convertTableToObject(response3);
        console.log(response3);
      },(error)=>{
        console.log(error);
      })
      console.log($event);
      



    },(error)=>{
      console.log(error);
    })
    console.log($event);

    
  }



}
