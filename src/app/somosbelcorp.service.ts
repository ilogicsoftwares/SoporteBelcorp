import { Injectable } from '@angular/core';
import {HttpClient, HttpXsrfTokenExtractor, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SomosbelcorpService {
  conexionSoportId:number=25;
  constructor(private http: HttpClient) { }

  cosultarPedidoDetalle(codigopais,codigoCampana,codigoConsultora){
    let sqlScript=`use belcorpcostarica
    select  pwd.PedidoID,pwd.CUV, pwd.PedidoDetalleID, pwd.CANTIDAD,pwd.PrecioUnidad,pwd.ImporteTotal,pwd.TipoEstrategiaID from pedidoweb ped
    inner join ods.consultora con on con.consultoraid = ped.consultoraid
    inner join pedidowebdetalle pwd on pwd.pedidoid=ped.pedidoid
    inner join usuario us on us.codigoconsultora = con.codigo
    where us.codigousuario='${codigoConsultora}' and ped.campaniaid=${codigoCampana}`;
    let params={idConexion:"23",
    consultaSql:sqlScript,
    usuario:"sdigitalpalancas"};

    return this.http.post<any>("/Consultoras/EjecutarQuerySql",
    params,
    )
  }
  convertTableToObject(tablex){
    let data=[];
    let table=tablex[0];
    table.Filas.forEach(Fila => {
      data.push(this.convertRowToObject(Fila,table.Columnas));
    });
    return data;
   
  }
  convertRowToObject(Fila,ColNames:any[]){
    let object={};
    ColNames.forEach((element,index) => {
      object[element.Nombre]=Fila.Datos[index];
    });
    return object;
  }
  listarConexiones(){
    let sqlScript =`select idConexion,replace(nombreBD,'Belcorp','') as NombreBD 
     from conexion where nombrebd like '%belcorp%`;
    let params={idConexion:this.conexionSoportId,
    consultaSql:sqlScript,
    usuario:"sdigitalpalancas"};

    return this.http.post<any>("/Consultoras/EjecutarQuerySql",
    params);
  }
  getPedidoWebSet(){

  }
}
