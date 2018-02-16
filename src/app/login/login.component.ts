import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit() {
    init_plugins(); //Esta función permite inicializar el sidebar y otros plugins del wrapper (assets/js/custom.js)
  }

  ingresar(){

    this.router.navigate(['/dashboard']);
  }

}
