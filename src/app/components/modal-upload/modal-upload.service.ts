// Servicio, que es intermediario entre los componentes y el modal-upload.component. Forma distinta que hacerlo con viewchild..
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string; //Tipo de archivo a subir
  public id: string;

  public oculto: string = 'oculto' ;

  public notificacion = new EventEmitter<any>();

  constructor() { 
   }

  

  mostrarModal( tipo: string, id: string){
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }

  ocultarModal(){
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;

  }

}
