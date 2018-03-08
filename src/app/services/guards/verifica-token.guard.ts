import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService:UsuarioService,
    public router:Router
  ){}

  canActivate(): Promise<boolean> | boolean {
    let token = this._usuarioService.token;
    console.log('token guard')
    //La función ATOB decodifica un string codificada en base-64
    let payload = JSON.parse( atob( token.split('.')[1] ) );
    let expirado = this.expirado( payload.exp );

    //Si expiro el token, no puede ingresar a la pagina donde esté el guard y lo manda al login
    if (expirado){
      this.router.navigate(['/login']);
      return false;
    }


    return this.verificaRenueva( payload.exp);
  }

  // Verifica si el token está a punto de expirar para renovarlo
  verificaRenueva( fechaExpiracion: number): Promise<boolean>{

    return new Promise( (resolve,reject) => {

      let tokenExp = new Date( fechaExpiracion * 1000); //Pasar la fecha de expiración a Date
      let ahora = new Date(); //fecha actual

      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000) ); //Sumarle 1 horas a la fecha actual

      if ( tokenExp.getTime() > ahora.getTime() ){ //Si El token tiene más de 1 horas para expirar
        //No renovamos el token
        resolve(true);
      }else{ //Si falta menos de 1 hora para que expire
        this._usuarioService.renuevaToken()
            .subscribe( () =>{
              //Si lo renueva volvemos el true
              resolve( true );
            }), () => {
              //Si sucede algun problema, se impide el acceso y se manda al login
              this.router.navigate(['/login']);
              reject ( false );
            };
      }

    });
  }

  expirado( fechaExpiracion: number){

    let ahora = new Date().getTime() / 1000; //Se obtiene el tiempo en milisegundos, y se divide en 100 para pasarlo a segundos

    if( fechaExpiracion < ahora){
      return true;
    }else{
      return false;
    }
  }

}
