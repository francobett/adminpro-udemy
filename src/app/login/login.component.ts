import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi:any; // Libreria de Google. Está importada en el index.html

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame:boolean = false;
  email: string;

  auth2: any; //Objeto signin de google

  constructor( 
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins(); //Esta función permite inicializar el sidebar y otros plugins del wrapper (assets/js/custom.js)
    this.googleInit();

    //Si está la opción de recuerdame, se carga el email automaticamente al entrar a login
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1){
      this.recuerdame = true;
    }
  }

  googleInit(){

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '665366368739-ojba5t0o699jq5e5jel3g2p54li97jln.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email' //Información que queremos del usuario de google
      });

      this.attachSignIn( document.getElementById('btnGoogle') ); 

    });

  }

  // Se ejecuta al hacer click en el btn de google, se llama en el googleInit, esta a la espera de que se haga click al mismo
  attachSignIn( element ){ 

    this.auth2.attachClickHandler( element , {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile(); // Perfil de google

      let token = googleUser.getAuthResponse().id_token; // Obtener token del usuario
      
      this._usuarioService.loginGoogle( token )
          .subscribe( () => window.location.href = '#/dashboard' );

    });

  }

  ingresar(forma: NgForm){

    if(forma.invalid){
      return;
    }

    let usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    this._usuarioService.login( usuario, forma.value.recuerdame )
        .subscribe( correcto => window.location.href = '#/dashboard' );
    // Usamos el window.location.href = '#/dashboard', en vez del
    // this.router.navigate(['/dashboard']);
    // Ya que se produce algún tipo de error en el template al enviar al dashboard
  }

}
