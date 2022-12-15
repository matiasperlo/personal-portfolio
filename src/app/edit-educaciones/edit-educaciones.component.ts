import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../core/root/toast.service';
import { Educacion } from '../shared/models/educacion';
import { Instituto } from '../shared/models/instituto';
import { EducacionService } from '../shared/services/educacion.service';
import { InstitutoService } from '../shared/services/instituto.service';



@Component({
  selector: 'app-edit-educaciones',
  templateUrl: './edit-educaciones.component.html',
  styleUrls: ['./edit-educaciones.component.css']
})
export class EditEducacionesComponent implements OnInit {
  
  
  educaciones: Educacion[] = [];
  instituciones: Instituto[] = [];

  onForm: boolean = false;

  formItem: FormGroup;

  constructor(
    private educacionService: EducacionService,
    private institucionService: InstitutoService,
    private fb: FormBuilder,
    public router: Router,
    private toastService: ToastService
  ) { 

    this.formItem = this.fb.group({});
  }

  ngOnInit(): void {
    this.cargarEducaciones();

    this.formItem = this.fb.group({
      id: [null],
      titulo: ['', [Validators.required]],
      instituto: [null, [Validators.required]],
      fechainicio: [null, [Validators.required]],
      fechafin: [null, Validators.required]
    });

  }

  cargarEducaciones() {
    const myObserver = {
      next: (data: Educacion[]) => {
        this.educaciones = data;
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show('Error al cargar la lista de educación', {classname: 'bg-danger text-light'});
      }
    }

    this.educacionService.getEducaciones().subscribe(myObserver);
  }

  cargarInstituciones(next_func: any = null){
    const myObserver = {
      next: (data:any) => {
        this.instituciones = data;
        if (next_func && typeof next_func == 'function'){
          next_func();
        }
      },
      error: (error: any) => {
        this.toastService.show('Error al cargar datos. Inténtelo más tarde', {classname: 'bg-danger text-light'});
      }
    }

    this.institucionService.getInstituciones().subscribe(myObserver);
  }

  editarItem(edu: Educacion){
    this.onForm = true;


    // logica que se ejecuta solo si todavia no se cargaron las instituciones.
    const continuar = () => {
      this.formItem.reset({
        id: edu.id,
        titulo: edu.titulo,
        instituto: edu.instituto.id,
        fechainicio: edu.fechainicio,
        fechafin: edu.fechafin
      });
    };

    if(this.instituciones.length != 0){
      continuar();
    } else {
      this.cargarInstituciones(continuar);
    }
    
  }



  crearItem(){
    this.onForm = true;

    this.cargarInstituciones();

    this.formItem.reset({});
  }

  cancelar(){
    this.onForm = false;
  }

  grabar(){

    if (this.formItem.invalid){
      // TODO: Advertencia con Modal en vez de Toast?
      return;
    }

    const itemCopy = { ...this.formItem.value };
    const dataRequest = {
      id: itemCopy.id,
      titulo: itemCopy.titulo,
      instituto: this.instituciones.find(inst => inst.id == itemCopy.instituto),
      fechainicio: itemCopy.fechainicio,
      fechafin: itemCopy.fechafin
    };

    const requestObserver = {
      next: (res: any) => {
        this.toastService.show('Datos guardados correctamente', {classname: 'bg-success text-light'});
        this.cargarEducaciones();
      },
      error: (err: any) => {
        this.toastService.show('Error al intentar grabar los datos. Inténtelo de nuevo más tarde.', {classname: 'bg-danger text-light'});
      }
    };

    this.educacionService.postEducacion(dataRequest).subscribe(requestObserver);
    this.onForm = false;
  }

  eliminarItem(edu: Educacion){
    const item = edu;
    const deleteObserver = {
      next: (res: any) => {
        this.toastService.show('Registro eliminado correctamente', {classname: 'bg-success text-light'});
        this.cargarEducaciones();
      },
      error: (err: any) => {
        this.toastService.show('Error al intentar eliminar el registro', {classname: 'bg-danger text-light'});
      }
    }

    this.educacionService.deleteEducacion(item.id).subscribe(deleteObserver);
  }

}
