import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class HospitalService {



  constructor(
    public http:HttpClient,
    public _usuarioService:UsuarioService
  ) { 
    
   }

  actualizarHospital( hospital:Hospital){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;
    return this.http.put( url, hospital )
          .map( (resp:any) =>{
            swal('Hospital Actualizado', hospital.nombre, 'success');
            return true;
          });

  }

  borrarHospital( id:string ){
    let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url)
          .map( (resp:any) => {
            swal(
              'Eliminado!',
              'El hospital '+ resp.hospital.nombre + ' ha sido eliminado',
              'success'
            )
            return true;
          })
  }

  buscarHospital( termino:string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino ;

    return this.http.get(url)
                .map( (resp:any) => resp.hospital);


  }

  cargarHospitales( desde:number = 0, todos:boolean = false ){

    //Si todos= true, se devolveran todos sin importar el desde.
    //Si todos = false, se devuelven 5 apartir del desde.
    let url = URL_SERVICIOS + '/hospital?desde=' + desde + '&todos=' + todos;

    return this.http.get(url);
    
    
  }


  crearHospital( nombre:string ){
    let url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;

    return this.http.post( url , {nombre} )
        .map( (resp:any) => {

          swal('Hospital creado', resp.hospital.nombre, 'success');
          return resp.hospital;

        });

  }

  obtenerHospital( id:string ){
    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url)
          .map( (resp:any ) => resp.hospital);
  }



}
