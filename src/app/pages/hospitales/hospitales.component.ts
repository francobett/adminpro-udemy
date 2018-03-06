import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales:Hospital[] = [];
  desde:number = 0;
  totalHospitales:number = 0 ;
  cargando:boolean = true;

  constructor(
    public _hospitalService:HospitalService,
    public _modalUploadService:ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    //Suscribir a cualquier emisión del modalUploadService
    this._modalUploadService.notificacion
        .subscribe( resp => {
          //Recargar los hospitales
          this.cargarHospitales();
        });
  }

  borrarHospital( hospital:Hospital){

    swal({
      title: 'Esta seguro?',
      text: "Esta a punto de borrar a " + hospital.nombre,
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
        
        this._hospitalService.borrarHospital(hospital._id)
            .subscribe( (borrado) => {

              this.cargarHospitales();

            });

      }
    })
  }

  buscarHospital( termino:string){

    if(termino.length <= 0){
      this.cargarHospitales();
      return;
    }

    this.cargando = true;


    this._hospitalService.buscarHospital(termino)
        .subscribe( (hospitales:Hospital[]) => {
          this.hospitales = hospitales;
          this.cargando = false;
        });

  }

  cambiarDesde( valor:number ){
    
    let desde = this.desde + valor; 

    if( desde>= this.totalHospitales ){
      return;
    }

    if (desde < 0 ){
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  cargarHospitales(){
    this.cargando = true;

    this._hospitalService.cargarHospitales(this.desde)
        .subscribe( (resp:any) => {

          this.hospitales = resp.hospitales;
          this.totalHospitales = resp.total;
          this.cargando = false;
        });
  }

  crearHospital(){

    swal({
      title: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      showLoaderOnConfirm: true,
      preConfirm: (nombre) => {
        return new Promise((resolve) => {
          resolve();
          this._hospitalService.crearHospital(nombre)
              .subscribe( resp => {
                swal({
                  type: 'success',
                  title: resp.nombre + ' creado'
                })
                this.cargarHospitales();
              })
        })
      },
      allowOutsideClick: () => !swal.isLoading()
    })
  
  }


  guardarHospital(hospital:Hospital){
    this._hospitalService.actualizarHospital( hospital )
      .subscribe();
  }

  mostrarModal( id:string ){
    this._modalUploadService.mostrarModal( 'hospitales', id );
  }

  

}
