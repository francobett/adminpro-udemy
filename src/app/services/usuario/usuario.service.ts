import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import swal from 'sweetalert2';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router:Router,
    public _subirArchivo:SubirArchivoService
  ) { 
    this.cargarStorage();
   }

   actualizarUsuario( usuario:Usuario ){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    return this.http.put( url, usuario )
          .map( (resp:any) =>{

            //Si el usuario a actualizar es el logueado (o sea él mismo se actualiza)
            if( usuario._id === this.usuario._id){

              //Actualizar Local Storage
              this.guardarStorage( resp.usuario._id, this.token , resp.usuario, this.menu );

            }

            swal('Usuario Actualizado', usuario.nombre, 'success');

            return true;
          })
          .catch( error => {

            swal( error.error.mensaje , error.error.errors.message, 'error');
            return Observable.throw(error);
            
          });

   }

   borrarUsuario( id:string ){

    let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete(url)
              .map( (resp:any) => {
                swal(
                  'Eliminado!',
                  'El usuario '+ resp.usuario.nombre + ' ha sido eliminado',
                  'success'
                )
                return true;
              });

   }

   buscarUsuarios( termino:string ){

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino ;

    return this.http.get(url)
                .map( (resp:any) => resp.usuario)

   }

   cambiarImagen( archivo:File, id:string){

 
    //Con Promesas y xhr de AJAX
    this._subirArchivo.subirArchivo(archivo , 'usuarios' , id )
        .then( (resp:any) => {

          this.usuario.img = resp.usuarioActualizado.img;
          swal('Imagen actualizada', this.usuario.nombre, 'success');
          this.guardarStorage( id , this.token, this.usuario, this.menu);
        })
        .catch( error => {
          console.log(error)
        });


   }

   cargarStorage(){
    if( localStorage.getItem('token') ){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario') );
      this.menu = JSON.parse(localStorage.getItem('menu') );
    }else{
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
   }

   cargarUsuarios( desde:Number = 0 ){ //Cargar los usuarios desde el n° DESDE, mostrando 5 (eso es lo que muestra el get del bcknd)

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get( url );

   }

   crearUsuario( usuario:Usuario ){

    let url = URL_SERVICIOS + '/usuario';

    return  this.http.post( url, usuario )
            .map( (resp:any) => {

              swal('Usuario creado', usuario.email, 'success');
              return resp.usuario;

            })
            .catch( error => {

              swal( error.error.mensaje , error.error.errors.message, 'error');
              return Observable.throw(error);
              
            });

   }

   estaLogueado(){
    return (this.token.length > 5) ? true : false;
   }

   guardarStorage( id:string, token:string, usuario:Usuario, menu:any){

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify( usuario ) );
    localStorage.setItem('menu', JSON.stringify( menu ) );

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

   }

   logout(){
     this.usuario = null;
     this.token = '';
     this.menu = [];

     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('menu');

     this.router.navigate(['/login']);
   }

   loginGoogle( token:string ){

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url , {token} )
        .map( (resp:any) => {

          this.guardarStorage( resp.id, resp.token, resp.usuario , resp.menu );

          return true; //Se logeo correctamente
        });
        
   }

   login( usuario:Usuario, recordar:boolean = false ){

    if( recordar ){
      localStorage.setItem('email', usuario.email );
    }else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario )
          .map( (resp:any) => {
            this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
            return true; //Se logeo correctamente
          })
          .catch( error => {

            swal('Error en el login', error.error.mensaje, 'error');
            return Observable.throw(error);
            
          });
   }

   renuevaToken(){
     let url = URL_SERVICIOS + '/login/renuevatoken?token=' + this.token;
     
     return this.http.get( url )
        .map( (resp:any) =>{
          //Guardar el nuevo token
          this.token = resp.token;
          localStorage.setItem('token', this.token);
          console.log('token renovado');
          return true;
        })
        .catch( error => {
          this.router.navigate(['/login']);
          swal( 'No se pudo renovar token' , 'No fue posible renovar el token', 'error');
          return Observable.throw(error);
        });

   }


}
