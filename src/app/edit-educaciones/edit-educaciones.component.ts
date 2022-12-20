import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from '../core/root/document.service';
import { ToastMessages, ToastService } from '../core/root/toast.service';
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

  onNuevoInstituto: boolean = false; 
  onForm: boolean = false;

  formItem: FormGroup;
  formInstitucion: FormGroup;

  constructor(
    private educacionService: EducacionService,
    private institucionService: InstitutoService,
    private fb: FormBuilder,
    public router: Router,
    private toastService: ToastService,
    private documentService: DocumentService
  ) { 

    this.documentService.setSubTitle('Educación');

    this.formItem = this.fb.group({});
    this.formInstitucion = this.fb.group({});
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

    this.formInstitucion = this.fb.group({
      nombre: ['', [Validators.required]],
      logo: ['', [Validators.required]]
    })

  }

  cargarEducaciones() {
    const myObserver = {
      next: (data: Educacion[]) => {
        this.educaciones = data;
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.showError(ToastMessages.E_LISTADO + ": Educacion");
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
        this.toastService.showError(ToastMessages.E_LISTADO + ": Instituciones");
      }
    }

    this.institucionService.getInstituciones().subscribe(myObserver);
  }

  editarItem(edu: Educacion){
    this.onForm = true;

    let fechaInicio = new Date(edu.fechainicio).toISOString().split('T')[0];
    let fechaFin = new Date(edu.fechafin).toISOString().split('T')[0];

    // logica que se ejecuta solo si todavia no se cargaron las instituciones.
    const continuar = () => {
      this.formItem.reset({
        id: edu.id,
        titulo: edu.titulo,
        instituto: edu.instituto.id,
        fechainicio: fechaInicio,
        fechafin: fechaFin
      });
    };

    this.cargarInstituciones(continuar);
    
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

    if (this.formItem.invalid && !this.onNuevoInstituto){
      this.toastService.showError(ToastMessages.E_CAMPOS_INVALIDOS);
      return;
    }

    const itemCopy = { ...this.formItem.value };

    if(this.onNuevoInstituto){
      if(this.formInstitucion.invalid){
        this.toastService.showError(ToastMessages.E_CAMPOS_INVALIDOS);
        return;
      }
      itemCopy["instituto"] = { ...this.formInstitucion.value };
    } else {
      itemCopy["instituto"] = this.instituciones.find(inst => inst.id == itemCopy.instituto);
    }

    const requestObserver = {
      next: (res: any) => {
        this.toastService.showSuccess(ToastMessages.S_GRABAR);
        this.formInstitucion.reset({});
        this.onNuevoInstituto = false;
        this.cargarEducaciones();
      },
      error: (err: any) => {
        this.toastService.showError(ToastMessages.E_GRABAR);
      }
    };

    this.educacionService.postEducacion(itemCopy).subscribe(requestObserver);
    this.onForm = false;
  }

  eliminarItem(edu: Educacion){
    const item = edu;
    const deleteObserver = {
      next: (res: any) => {
        this.toastService.showSuccess(ToastMessages.S_ELIMINAR);
        this.cargarEducaciones();
      },
      error: (err: any) => {
        this.toastService.showError(ToastMessages.E_ELIMINAR);
      }
    }

    this.educacionService.deleteEducacion(item.id).subscribe(deleteObserver);
  }

  onToggleNuevaInstitucion(){
    this.onNuevoInstituto = !this.onNuevoInstituto;
    if(!this.onNuevoInstituto){
      this.formInstitucion.reset();
    }
  }

}
