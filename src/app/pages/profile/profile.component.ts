import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario:Usuario;
  imagenSubir: File;
  imagenTemporal: string;

  constructor(
    public _usuarioService:UsuarioService
  ) { 
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar( usuario: Usuario){
    
    this.usuario.nombre = usuario.nombre;

    //Si no es de google permito actualizar el correo. En el html, esta el disabled
    if ( !this.usuario.google ){
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
        .subscribe();

  }

  seleccionImage( archivo:File ){
    
    //Si no recibimos un archivo
    if( !archivo){
      this.imagenSubir = null
      return;
    }

    //Si no es de un tipo image
    if( archivo.type.indexOf('image') < 0){
      swal('Sólo imágenes','El archivo seleccionado no es una imagen','error');
      this.imagenSubir = null;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemporal = reader.result;

  }

  cambiarImagen(){

    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id );

  }

}
