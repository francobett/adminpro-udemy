import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[] = [];
  desde: number = 0 ;
  totalUsuarios: number = 0;

  cargando:boolean = true;

  constructor(
    public _usuarioService:UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    //Suscribir a cualquier emisión del modalUploadService
    this._modalUploadService.notificacion
        .subscribe( resp => {
          //Recargar los usuarios
          this.cargarUsuarios();
        });
  }

  borrarUsuario( usuario:Usuario){
    
    //Si el usuario a borrar es el mismo que está en la aplicación, no podra borrarlo
    if( usuario._id === this._usuarioService.usuario._id ){
      swal('No puede borrar usuario','No se puede borrar a sí mismo','error');
      return;
    }

    swal({
      title: 'Esta seguro?',
      text: "Esta a punto de borrar a " + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: false
    }).then((borrar) => {
      if (borrar.value) {
        
        this._usuarioService.borrarUsuario(usuario._id)
            .subscribe( (borrado) => {

              this.cargarUsuarios();

            });

      }
    })

  }

  buscarUsuario( termino:string ){

    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino)
        .subscribe( (usuarios:Usuario[]) =>{
          
          this.usuarios = usuarios;
          this.cargando = false;

        });
  }

  cargarUsuarios(){

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
        .subscribe( (resp:any) => {

          this.totalUsuarios = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;

        });
  }

  cambiarDesde( valor:number ){
    
    let desde = this.desde + valor; 

    if( desde>= this.totalUsuarios ){
      return;
    }

    if (desde < 0 ){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  guardarUsuario( usuario:Usuario){
    
    this._usuarioService.actualizarUsuario( usuario )
        .subscribe();
  }

  mostrarModal( id: string ){
    this._modalUploadService.mostrarModal( 'usuarios', id );
  }
}
