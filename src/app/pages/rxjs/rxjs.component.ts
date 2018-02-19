import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription; //Se usa para poder hacer referencia a la suscripción fuera del constructor (q es donde se ejecuta)

  constructor() { 


    this.subscripcion = this.regresaObservable()
      .subscribe( 
      numero => console.log('Subs', numero),
      error => console.error(error),
      () => console.log('termino')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  regresaObservable(): Observable<any>{
   return new Observable( observer => {
      let contador = 0 ;

      let intervalo = setInterval( () => {
        contador += 1 ;

        let salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 3 ){
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if (contador === 2 ){
        //   observer.error('auxilio');
        // }


      }, 500 );

    })
    .retry(2)
    .map( (resp:any) => { //Obtiene la respuesta del observable y la transforma en lo que se desea
      return resp.valor;
    })
    .filter( (valor, index) => { //El filter se usa despues del map. Y filtra los valores segun lo q se desea
      if (valor % 2 === 1){
        //impar
        return true;
      }else{
        //par
        return false;
      }
      
    })    
    

    

  }

}
