import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/service.index';

declare function init_plugins();


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor( public _ajustes: SettingsService) { //Se inyecta para que cargue los ajustes

  }

  ngOnInit() {
    init_plugins(); //Esta función permite inicializar el sidebar y otros plugins del wrapper (assets/js/custom.js)
  }

}
