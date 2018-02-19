import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { MetadataFactory } from '@angular/compiler/src/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  pagina: string = '';

  constructor( 
    private router:Router,
    public title: Title, //Para manejar el titulo de la página
    public meta: Meta //Para manejar la metadata de la página
  ) { 

      this.getDataRoute().subscribe( data => {

        this.pagina = data.titulo;

        this.title.setTitle( this.pagina );  //Cambiar el titulo de la página

        let metaTag: MetaDefinition = {
          name: 'description',
          content: this.pagina
        }

        this.meta.updateTag( metaTag );
      });

   }

   getDataRoute(){

     return this.router.events
            .filter( evento => evento instanceof ActivationEnd )
            .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ) //Filtros para obtener el objeto que tiene la 'data' de la ruta
            .map( (evento: ActivationEnd) => evento.snapshot.data );
   }

  ngOnInit() {
  }

}
