import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from '../core/root/document.service';
import { ToastMessages, ToastService } from '../core/root/toast.service';
import { Empresa } from '../shared/models/empresa';
import { Experiencia } from '../shared/models/experiencia';
import { Jornada } from '../shared/models/jornada';
import { Puesto } from '../shared/models/puesto';
import { EmpresaService } from '../shared/services/empresa.service';
import { ExperienciaService } from '../shared/services/experiencia.service';
import { JornadaService } from '../shared/services/jornada.service';
import { PuestoService } from '../shared/services/puesto.service';

@Component({
  selector: 'app-edit-experiencias',
  templateUrl: './edit-experiencias.component.html',
  styleUrls: ['./edit-experiencias.component.css']
})
export class EditExperienciasComponent implements OnInit {

  experiencias: Experiencia[] = [];
  jornadas: Jornada[] = [];
  puestos: Puesto[] = [];
  empresas: Empresa[] = [];

  editaOAgrega: boolean = false;
  edita: boolean = false;
  onNuevaEmpresa: boolean = false;
  onNuevoPuesto: boolean = false;

  formItem: FormGroup;
  formEmpresa: FormGroup;
  formPuesto: FormGroup;

  constructor(
    private experienciaService: ExperienciaService,
    private puestoService: PuestoService,
    private jornadaService: JornadaService,
    private empresaService: EmpresaService,
    private fb: FormBuilder,
    public router: Router,
    public toastService: ToastService,
    private documentService: DocumentService
  ) { 
    this.documentService.setSubTitle('Experiencia');

    this.formItem = this.fb.group({});
    this.formEmpresa = this.fb.group({});
    this.formPuesto = this.fb.group({});
  }

  ngOnInit(): void {

    // Formulario de Experiencias
    this.formItem = this.fb.group({
      id: [null, []],
      puesto: [null, [Validators.required]],
      empresa: [null, [Validators.required]],
      jornada: [null, [Validators.required]],
      fechainicio: [null, [Validators.required]],
      fechafin: [null, [Validators.required]]
    });
    
    // Formulario de Empresas
    this.formEmpresa = this.fb.group({
      nombre: ['', [Validators.required]],
      logo: ['', [Validators.required]]
    });


    // Formulario de Puestos de Trabajo
    this.formPuesto = this.fb.group({
      puesto: ['', [Validators.required]],
      descripcion: ['', []]
    })

    this.cargarExperiencias();
  }

  cargarExperiencias(){
    const myObserver = {
      next: (data: any) => {
        this.experiencias = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    }

    this.experienciaService.getExperiencias().subscribe(myObserver);  
  }

  crearItem(){
    this.editaOAgrega = true;
    this.edita = false;

    this.cargarEmpresas();
    this.cargarPuestos();
    this.cargarJornadas();

    this.formItem.reset({});
    console.log("creando nueva exp")
  }

  cargarEmpresas(next_func: any = null) {
    const myObserver = {
      next: (data: any) => {
        this.empresas = data;
        if(next_func && typeof next_func == 'function') next_func();
      },
      error: (err: any) => {
        console.log(err);
      }
    };

    this.empresaService.getEmpresas().subscribe(myObserver);
  }

  cargarPuestos(next_func: any = null) {
    const myObserver = {
      next: (data: any) => {
        this.puestos = data;
        if(next_func && typeof next_func == 'function') next_func();
      },
      error: (err: any) => {
        console.log(err);
      }
    };

    this.puestoService.getPuestos().subscribe(myObserver);
  }

  cargarJornadas(next_func: any = null) {
    const myObserver = {
      next: (data: any) => {
        this.jornadas = data;
        if(next_func && typeof next_func == 'function') next_func();
      },
      error: (err: any) => {
        console.log(err);
      }
    };

    this.jornadaService.getJornadas().subscribe(myObserver);
  }

  editarItem(exp: Experiencia){
    this.editaOAgrega = true;
    this.edita = true;

    let fechaInicio = new Date(exp.fechainicio).toISOString().split('T')[0];
    let fechaFin = new Date(exp.fechafin).toISOString().split('T')[0];

    // logica que se ejecuta solo si todavia no se cargaron las instituciones.
    const continuar = () => {
      this.formItem.reset({
        id: exp.id,
        puesto: exp.puesto.id,
        empresa: exp.empresa.id,
        jornada: exp.jornada.id,
        fechainicio: fechaInicio,
        fechafin: fechaFin
      });
    };

    this.cargarPuestos(this.cargarEmpresas(this.cargarJornadas(continuar)));
    
  }

  eliminarItem(exp: Experiencia){
    const item = exp;
    const deleteObserver = {
      next: (res: any) => {
        this.toastService.showSuccess(ToastMessages.S_ELIMINAR);
        this.cargarExperiencias();
      },
      error: (err: any) => {
        this.toastService.showError(ToastMessages.E_ELIMINAR);
      }
    }

    this.experienciaService.deleteExperiencia(item.id).subscribe(deleteObserver);
  }

  grabar(){
    if (this.formItem.invalid && !this.onNuevoPuesto && !this.onNuevaEmpresa){
      this.toastService.showError("Campos Invalidos");
      return;
    }
    
    const itemCopy = { ...this.formItem.value };

    itemCopy["jornada"] = this.jornadas.find(jorn => jorn.id == itemCopy.jornada);

    // guardar puesto nuevo
    if(this.onNuevoPuesto){
      if(this.formPuesto.invalid){
        this.toastService.showError(ToastMessages.E_CAMPOS_INVALIDOS);
        return;
      }

      itemCopy["puesto"] = { ...this.formPuesto.value };
    } else {
      itemCopy["puesto"] = this.puestos.find(puesto => puesto.id == itemCopy.puesto)
    }

    // guardar empresa nueva
    if(this.onNuevaEmpresa){
      if(this.formEmpresa.invalid){
        this.toastService.showError(ToastMessages.E_CAMPOS_INVALIDOS);
        return;
      }
      itemCopy["empresa"] = { ...this.formEmpresa.value };
    } else {
      itemCopy["empresa"] = this.empresas.find(empr => empr.id == itemCopy.empresa)
    }

    const requestObserver = {
      next: (res: any) => {
        this.toastService.showSuccess(ToastMessages.S_GRABAR);
        this.resetForms();
        this.cargarExperiencias();
      },
      error: (err: any) => {
        this.toastService.showError(ToastMessages.E_GRABAR);
      }
    };

    console.log(itemCopy);
    this.editaOAgrega = false;
    this.experienciaService.postExperiencia(itemCopy).subscribe(requestObserver);
  }

  cancelar(){
    this.editaOAgrega = false;
    this.resetForms();
  }

  private resetForms(){
    this.onNuevoPuesto = false;
    this.onNuevaEmpresa = false;

    this.formItem.reset();
    this.formPuesto.reset();
    this.formEmpresa.reset();
  }
}
