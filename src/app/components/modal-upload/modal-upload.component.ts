import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemporal: string;


  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
    
  ) { 
  }

  ngOnInit() {
  }

  cerrarModal(){
    this.imagenTemporal = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
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

  subirImagen(){
    
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
        .then(resp => {

          //Emitir información con la respuesta del subir archivo
          this._modalUploadService.notificacion.emit( resp );
          this.cerrarModal();

        })
        .catch( error => {
          console.log('Error en la carga');
        })

  }


}
