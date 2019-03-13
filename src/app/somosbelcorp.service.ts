import { Injectable } from '@angular/core';
import {HttpClient, HttpXsrfTokenExtractor, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SomosbelcorpService {

  constructor(private http: HttpClient) { }

  cosultarPedido(codigopais,codigoCampana,codigoConsultora){
    let sqlScript=`use belcorpperu
    select top 5 * from pedidoweb ped
    inner join ods.consultora con on con.consultoraid = ped.consultoraid
    inner join usuario us on us.codigoconsultora = con.codigo
    where us.codigousuario='${codigoConsultora}' and ped.campaniaid=${codigoCampana}`;
    let params={idConexion:"23",
    consultaSql:sqlScript,
    usuario:"sdigitalpalancas"};

    return this.http.post<any>("/Consultoras/EjecutarQuerySql",
    params,
    )
  }
}
