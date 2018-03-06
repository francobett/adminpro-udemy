import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos:Medico[] = [];
  desde:number = 0;
  totalMedicos:number = 0 ;
  cargando:boolean = true;


  constructor(
    public _medicoService:MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();

  }

  borrarMedico( medico:Medico){

    swal({
      title: 'Esta seguro?',
      text: "Esta a punto de borrar a " + medico.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: false
    }).then((borrar) => {
      if (borrar.value) {
        
        this._medicoService.borrarMedico(medico._id)
            .subscribe( (borrado) => {

              this.cargarMedicos();

            });

      }
    })
  }


  buscarMedico( termino:string){

    if(termino.length <= 0){
      this.cargarMedicos();
      return;
    }

    this.cargando = true;


    this._medicoService.buscarMedicos(termino)
        .subscribe( (medicos:Medico[]) => {
          this.medicos = medicos;
          this.cargando = false;
        });

  }

  cambiarDesde( valor:number ){
    
    let desde = this.desde + valor; 

    if( desde>= this.totalMedicos ){
      return;
    }

    if (desde < 0 ){
      return;
    }

    this.desde += valor;
    this.cargarMedicos();
  }



  cargarMedicos(){
    this.cargando = true;

    this._medicoService.cargarMedicos(this.desde)
        .subscribe( (resp:any) => {

          this.medicos = resp.medicos;
          this.totalMedicos = resp.total;
          this.cargando = false;
        });

  }
}
