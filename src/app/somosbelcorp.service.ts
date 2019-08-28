import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'; 
import {HttpClient, HttpXsrfTokenExtractor, HttpHeaders} from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SomosbelcorpService {
  conexionSoportId:number=25;
  constructor(private http: HttpClient) { }

  getOfertaPersonalizada(codigoPais, codigoCampana, codigoConsultora, tipoPersonalizacion, cuv){
    let sqlScriptPersonalizada = `use ${this.getBD(codigoPais)}
    select * from ods.ofertaspersonalizadas
    where AnioCampanaVenta = '${codigoCampana}'
    and CodConsultora = '${codigoConsultora}'
    and CUV = '${cuv}'
    and TipoPersonalizacion = '${tipoPersonalizacion}'`;
    
    let params={idConexion:"23",
    consultaSql:sqlScriptPersonalizada,
    usuario:"sdigitalpalancas"};

    let ofertasPersonalizadas = this.http.post<any>("/Consultoras/EjecutarQuerySql",
    params
    )

    return ofertasPersonalizadas;
  }

  getOfertaPersonalizadaX(codigoPais, codigoCampana, tipoPersonalizacion, cuv){
    let sqlScriptPersonalizada = `use ${this.getBD(codigoPais)}
    select * from ods.ofertaspersonalizadas
    where AnioCampanaVenta = '${codigoCampana}'
    and CodConsultora = '${environment.consultoraX}'
    and CUV = '${cuv}'
    and TipoPersonalizacion = '${tipoPersonalizacion}'`;
    
    let params={idConexion:"23",
    consultaSql:sqlScriptPersonalizada,
    usuario:"sdigitalpalancas"};

    let ofertasPersonalizadas = this.http.post<any>("/Consultoras/EjecutarQuerySql",
    params
    )

    return ofertasPersonalizadas;
  }

  getOfertaPersonalizadaY(codigoPais, codigoCampana, tipoPersonalizacion, cuv){
    let sqlScriptPersonalizada = `use ${this.getBD(codigoPais)}
    select * from ods.ofertaspersonalizadas
    where AnioCampanaVenta = '${codigoCampana}'
    and CodConsultora = '${environment.consultoraY}'
    and CUV = '${cuv}'
    and TipoPersonalizacion = '${tipoPersonalizacion}'`;
    
    let params={idConexion:"23",
    consultaSql:sqlScriptPersonalizada,
    usuario:"sdigitalpalancas"};

    let ofertasPersonalizadas = this.http.post<any>("/Consultoras/EjecutarQuerySql",
    params
    )

    return ofertasPersonalizadas;
  }

  getOfertaPersonalizadaCUV(codigoPais, codigoCampana, tipoPersonalizacion, cuv){
    let sqlScriptPersonalizada = `use ${this.getBD(codigoPais)}
    select * from ods.ofertaspersonalizadas
    where AnioCampanaVenta = '${codigoCampana}'
    and CUV = '${cuv}'
    and TipoPersonalizacion = '${tipoPersonalizacion}'`;
    
    let params={idConexion:"23",
    consultaSql:sqlScriptPersonalizada,
    usuario:"sdigitalpalancas"};

    let ofertasPersonalizadas = this.http.post<any>("/Consultoras/EjecutarQuerySql",
    params
    )

    return ofertasPersonalizadas;
  }

  getProductoComercial(codigoPais, codigoCampana, cuv){
    let sqlScriptPersonalizada = `use ${this.getBD(codigoPais)}
    select * from ods.ofertaspersonalizadas
    where AnioCampanaVenta = '${codigoCampana}'
    and CUV = '${cuv}'`;
    
    let params={idConexion:"23",
    consultaSql:sqlScriptPersonalizada,
    usuario:"sdigitalpalancas"};

    let ofertasPersonalizadas = this.http.post<any>("/Consultoras/EjecutarQuerySql",
    params
    )

    return ofertasPersonalizadas;
  }

  getEstrategia(codigoPais, codigoCampana, cuv){
    let sqlScriptPersonalizada = `use ${this.getBD(codigoPais)}
    select * from ods.ofertaspersonalizadas
    and CUV = '${cuv}'`;
    
    let params={idConexion:"23",
    consultaSql:sqlScriptPersonalizada,
    usuario:"sdigitalpalancas"};

    let ofertasPersonalizadas = this.http.post<any>("/Consultoras/EjecutarQuerySql",
    params
    )

    return ofertasPersonalizadas;
  }

  public consultaOfertaPersonalizada(codigoPais, codigoCampana, codigoConsultora, tipoPersonalizacion, cuv): Observable<any> {
    //let response1 = this.http.get(requestUrl1);
    //let response2 = this.http.get(requestUrl2);
    //let response3 = this.http.get(requestUrl3);

    let response1 = this.getOfertaPersonalizada(codigoPais, codigoCampana, codigoConsultora, tipoPersonalizacion, cuv);
    let response2 = this.getOfertaPersonalizadaX(codigoPais, codigoCampana, tipoPersonalizacion, cuv);
    let response3 = this.getOfertaPersonalizadaY(codigoPais, codigoCampana, tipoPersonalizacion, cuv);
    let respuesta = forkJoin([response1, response2, response3]).pipe(map((data)=>{
      let repsonse1 = this.convertTableToObject(data[0]);
      let respuesta2 = "no existe";
      return of(respuesta2);
    }));
    return respuesta;
  }

  cosultarPedidoDetalle(codigopais,codigoCampana,codigoConsultora){
    let sqlScript=`use ${codigopais}
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
  getBD(codigoPais:string){
    let bd = "";

    switch (codigoPais) {
      case ("BO"):
        bd="BelcorpBolivia";
        break;
      case ("CL"):
        bd="BelcorpChile";
        break;
      case ("CO"):
        bd="BelcorpColombia";
        break;
      case ("CR"):
        bd="BelcorpCostaRica";
        break;
      case ("DO"):
        bd="BelcorpDominicana";
        break;
      case ("EC"):
        bd="BelcorpEcuador";
        break;
      case ("GT"):
        bd="BelcorpGuatemala";
        break;
      case ("MX"):
        bd="BelcorpMexico";
        break;
      case ("PA"):
        bd="BelcorpPanama";
        break;
      case ("PE"):
        bd="BelcorpPeru";
        break;
      case ("PR"):
        bd="BelcorpPuertoRico";
        break;
      case ("SV"):
        bd="BelcorpSalvador";
        break;
      default:
        bd = "";
        break;
    }

    return bd;
  }
}
