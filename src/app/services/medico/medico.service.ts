import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  constructor(
    public http:HttpClient,
    public _usuarioService:UsuarioService

  ) { }

  borrarMedico( id:string ){
    let url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url)
          .map( (resp:any) => {
            swal(
              'Eliminado!',
              'El medico: '+ resp.medico.nombre + ' ha sido eliminado',
              'success'
            )
            return true;
          })
  }


  buscarMedicos( termino:string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino ;

    return this.http.get(url)
                .map( (resp:any) => resp.medico);


  }

  //Carga un médico según un id
  cargarMedico(id:string){
    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
            .map( (resp:any) => resp.medico);

  }


  //Carga todos los medicos a partir de un parametro desde hasta +5
  cargarMedicos( desde:Number = 0 ){

    let url = URL_SERVICIOS + '/medico?desde=' + desde;

    return this.http.get(url);
  }

  guardarMedico( medico:Medico){
    //Si existe el id, significa que estoy actualizando
    if(medico._id){
      let url = URL_SERVICIOS + '/medico/' + medico._id + '?token=' + this._usuarioService.token;  
      return this.http.put( url, medico)
              .map( (resp:any) => {
                swal('Medico Actualizado', medico.nombre , 'success');
                return resp.medico;
              });   

    }else{//SI no existe, estoy creando un nuevo medico
      let url = URL_SERVICIOS + '/medico?token=' + this._usuarioService.token;     
      return this.http.post( url, medico)
              .map( (resp:any) =>{
                swal('Medico Creado', medico.nombre , 'success');
                return resp.medico;
              });
      }

  }



}
