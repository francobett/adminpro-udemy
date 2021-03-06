import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img:string , tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    //Si no recibo ninguna imagen
    if (!img){
      return url + '/usuarios/no-img'; //El bcknd está configurado para que si no es un url válido, devuelva la no img
    }

    //Si la imagen contiene un https, será de google. Ya que las imagenes que NO son de google tienen otro tipo de nombre sin https
    if (img.indexOf('https') >= 0){
      return img;
    }

    switch(tipo){

      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'medico':
        url += '/medicos/' + img;
      break;

      case 'hospital':
        url += '/hospitales/' + img;
      break;

      default:
        console.log('tipo de imagen no existe: usuarios, medicos, hospitales')
        url += '/usuarios/no-img';
      
      
    }

    return url;
  }

}
