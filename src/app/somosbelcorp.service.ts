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

  getOfertaPersonalizadaCUV(codigoPais, codigoCampana, tipoPersonalizacion, cuv){
    let sqlScriptPersonalizada = `use ${this.getBD(codigoPais)}
    select * from ods.ofertaspersonalizadascuv
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
    select * from ods.productocomercial
    where AnoCampania = '${codigoCampana}'
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

    let respuestaFinal = [];
    let listaOfertaPersonalizada = this.getOfertaPersonalizada(codigoPais, codigoCampana, codigoConsultora, tipoPersonalizacion, cuv);
    let listaOfertaPersonalizadaX = this.getOfertaPersonalizada(codigoPais, codigoCampana, environment.consultoraX, tipoPersonalizacion, cuv);
    let listaOfertaPersonalizadaY = this.getOfertaPersonalizada(codigoPais, codigoCampana, environment.consultoraY,tipoPersonalizacion, cuv);
    let listaOfertaPersonalizadaCuv = this.getOfertaPersonalizadaCUV(codigoPais, codigoCampana,tipoPersonalizacion, cuv);
    let listaProductoComercial = this.getProductoComercial(codigoPais, codigoCampana, cuv);
    let respuesta = forkJoin
    ([
      listaOfertaPersonalizada, 
      listaOfertaPersonalizadaX, 
      listaOfertaPersonalizadaY,
      listaOfertaPersonalizadaCuv,
      listaProductoComercial
    ]).pipe(map((data)=>{
      let jsonOfertaPersonalizada = this.convertTableToObject(data[0]);
      let jsonOfertaPersonalizadaX = this.convertTableToObject(data[1]);
      let jsonOfertaPersonalizadaY = this.convertTableToObject(data[2]);
      let listaOfertaPersonalizadaCuv = this.convertTableToObject(data[3]);
      let listaProductoComercial = this.convertTableToObject(data[4]);
      let mensaje = "";

      if(jsonOfertaPersonalizada.length == 0){
        if(jsonOfertaPersonalizadaX.length == 0 && jsonOfertaPersonalizadaY.length == 0){
          mensaje = 'No se encontró oferta en oferta personalizada SQL|';
        }
      }

      if(listaOfertaPersonalizadaCuv.length == 0){
        mensaje += 'No se encontró oferta en oferta personalizada cuv SQL|';
      }

      if(listaProductoComercial.length == 0){
        mensaje += 'No se encontró oferta en producto comercial SQL|';
      }

      let respuestaFinal = [
        {Mensaje : mensaje}
      ]
      
      return of(respuestaFinal);
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
