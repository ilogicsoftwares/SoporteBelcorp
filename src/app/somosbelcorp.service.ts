import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'; 
import {HttpClient, HttpXsrfTokenExtractor, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { AuthServiceService } from './guards/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class SomosbelcorpService {
  conexionSoportId:number=25;
  apiurl = environment.api;
  headers=new HttpHeaders();
  constructor(private http: HttpClient, private authService: AuthServiceService) { 
   this.headers = this.headers.append('Content-Type', 'application/json');
   this.headers = this.headers.append('token', this.authService.getToken());
  }

  public consultaOfertaPersonalizada(codigoPais, codigoCampana, tipoPersonalizacion, cuv): Observable<any> {
    let url = `http://localhost:5000/Personalizacion/consultar/${codigoPais}/${codigoCampana}/${tipoPersonalizacion}/${cuv}`;

    let resultado = this.http.get(url);

    return resultado;
  }

  public consultaOfertaPersonalizadaPorConsultora(codigoPais, codigoCampana, tipoPersonalizacion, codConsultora): Observable<any> {
    
    let params = {codigoPais:codigoPais, codigoCampana:codigoCampana, tipoPersonalizacion:tipoPersonalizacion,codConsultora:codConsultora};
    let resultado = this.http.post(this.apiurl + "/ofpConsultora",params).pipe(
      map((data:any)=>{

       let resultado = data.result.map((item)=>{
        return {
          FlagRevista: item.FlagRevista,
          Orden: item.Orden,
          CUV2: item.CUV2,
          DescripcionCUV2: item.DescripcionCUV2
        }
       })

       resultado.sort(function(a, b){return b.FlagRevista - a.FlagRevista});
       return resultado;
      })
    );

    return resultado;
  }



  cosultarPedidoDetalle(codigopais,codigoCampana,codigoConsultora){
    let sqlScript=`use ${codigopais}
    select  pwd.* from pedidoweb ped
    inner join ods.consultora con on con.consultoraid = ped.consultoraid
    inner join pedidowebdetalle pwd on pwd.pedidoid=ped.pedidoid
    inner join usuario us on us.codigoconsultora = con.codigo
    where us.codigousuario='${codigoConsultora}' and ped.campaniaid=${codigoCampana}`;
    let params={idConexion:"23",
    consultaSql:sqlScript,
    usuario:"sdigitalpalancas"};

    return this.http.post<any>("http://localhost:8080/Consultoras/EjecutarQuerySql",
    params, {headers: this.headers});
  }

  consultarPedidoSet(codigopais,pedidoid){
    let sqlScript=`use ${codigopais}
    select top 10 * from pedidowebset where pedidoid='${pedidoid}'`;
    let params={idConexion:"23",
    consultaSql:sqlScript,
    usuario:"sdigitalpalancas"};

    return this.http.post<any>( this.apiurl + "/Consultoras/EjecutarQuerySql",
    params, {headers: this.headers});
  }
  consultarPedidoSetDetalle(codigopais,pedidoid){
    let sqlScript=`use ${codigopais}
    select * from pedidowebsetdetalle where setid in (select setid from pedidowebset where pedidoid='${pedidoid}')`;
    let params={idConexion:"23",
    consultaSql:sqlScript,
    usuario:"sdigitalpalancas"};

    return this.http.post<any>(this.apiurl + "/Consultoras/EjecutarQuerySql",
    params, {headers: this.headers});
  }
  convertTableToObject(tablex){
    let data=[];
    let table=tablex[0];
    table.Filas.forEach(Fila => {
      data.push(this.convertRowToObject(Fila,table.Columnas));
    });
    return data;
   
  }

  convertResultToObject(response){
    let data=[];
    if(response.message == "OK"){
      data.push({"Mensaje": response.result});
    }else{
      data.push({"Mensaje": "Horror"});
    }
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

    return this.http.post<any>(this.apiurl + "/Consultoras/EjecutarQuerySql",
    params, {headers: this.headers});
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
