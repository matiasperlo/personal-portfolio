import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from '../core/root/document.service';
import { ToastService } from '../core/root/toast.service';
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
  formItem: FormGroup;
  formEmpresa: FormGroup;

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
    this.formItem = this.fb.group({});
    this.formEmpresa = this.fb.group({});
    this.documentService.setSubTitle('Experiencia');
  }

  ngOnInit(): void {
    this.formItem = this.fb.group({
      puesto: [null, [Validators.required]],
      empresa: [null, [Validators.required]],
      jornada: [null, [Validators.required]],
      fechainicio: [null, [Validators.required]],
      fechafin: [null, [Validators.required]]
    });
    
    this.formEmpresa = this.fb.group({
      nombre: ['', [Validators.required]],
      logo: ['', [Validators.required]]
    });

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
        rol: exp.puesto.id,
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
        console.log('response: ' + res);
        this.toastService.show('Registro eliminado correctamente', {classname:'bg-success text-light'});
        this.cargarExperiencias();
      },
      error: (err: any) => {
        this.toastService.show('Error al intentar eliminar el registro', {classname:'bg-danger text-light'});
      }
    }

    this.experienciaService.deleteExperiencia(item.id).subscribe(deleteObserver);
  }

  grabar(){
    if (this.formItem.invalid){
      this.toastService.showError("Campos Invalidos");
      return;
    }
    

    const itemCopy = { ...this.formItem.value };

    const dataRequest = {
      id: itemCopy.id,
      puesto: this.puestos.find(puesto => puesto.id == itemCopy.puesto),
      empresa: this.empresas.find(empr => empr.id == itemCopy.empresa),
      jornada: this.jornadas.find(jorn => jorn.id == itemCopy.jornada),
      fechainicio: itemCopy.fechainicio,
      fechafin: itemCopy.fechafin
    };

    const requestObserver = {
      next: (res: any) => {
        
        console.log(res);
        this.toastService.show('Cambios realizados con exito', {classname:'bg-success text-light'});
        this.cargarExperiencias();
      },
      error: (err: any) => {
        this.toastService.show('Error al realizar los cambios', {classname:'bg-success text-light'});
        console.log(err);
      }
    };

    console.log(dataRequest);
    this.experienciaService.postExperiencia(dataRequest).subscribe(requestObserver);
    this.editaOAgrega = false;
  }

  cancelar(){
    this.editaOAgrega = false;
  }
}
