import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SubirArchivoService {

  constructor( public httpClient:HttpClient) { }

  
  subirArchivo( archivo:File , tipo:string , id:string ){
    // Con Promesa y xhr AJAX - JavaScript Puro
    return new Promise( (resolve, reject) => {

      let formdata = new FormData();
      //Inicializar Petición AJAX
      let xhr = new XMLHttpRequest();
  
      formdata.append('imagen', archivo, archivo.name ); //Configurar form data
  
      //Cada vez que el estado cambie
      xhr.onreadystatechange = function(){
  
        //Cuando está en el estado 4 (Que es cuando termina el proceso)
        if( xhr.readyState === 4){
  
          //Si el estado es 200, la imagen se subio
          if( xhr.status === 200){
            console.log('imagen subida');
            resolve( JSON.parse(xhr.response) ); //Si todo sale bien entonces devolver la respuesta
          }else{
            console.log('fallo la subida');
            reject( xhr.response );
          }
        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true); //Envío PUT asincrono
      xhr.send( formdata );
  
    });



  }

}
