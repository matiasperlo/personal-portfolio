import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../core/root/toast.service';
import { Proyecto } from '../shared/models/proyecto';
import { ProyectosService } from '../shared/services/proyectos.service';

@Component({
  selector: 'app-edit-proyectos',
  templateUrl: './edit-proyectos.component.html',
  styleUrls: ['./edit-proyectos.component.css']
})
export class EditProyectosComponent implements OnInit {

  proyectos: Proyecto[] = [];

  editaOAgrega: boolean = false;
  edita: boolean = false;
  formItem: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectosService,
    public router: Router,
    public toastService: ToastService
  ) { 
    this.formItem = this.fb.group({});
  }

  ngOnInit(): void {

    this.cargarProyectos();
    
    this.formItem = this.fb.group ({
      id: [null],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      link: ['']
    })
  }

  cargarProyectos(){
    const myObserver = {
      next: (data: any) => {
        this.proyectos = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    };

    this.proyectoService.getProyectos().subscribe(myObserver);
  }

  crearItem(){
    this.editaOAgrega= true;
    this.edita= false;
  }

  editarItem(proyecto: Proyecto){
    this.editaOAgrega= true;
    this.edita= true;

    this.formItem.reset ({
      id: proyecto.id,
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      link: proyecto.link
    })
  }

  eliminarItem(proyecto: Proyecto){
    const myObserver = {
      next: (data: any) => {
        this.toastService.show('Registro eliminado correctamente.', {classname: 'bg-success text-light'});
        this.cargarProyectos();
      },
      error: (err: any) => {
        this.toastService.show('Error al intentar eliminar el registro.', {classname: 'bg-danger text-light'});

      }
    };

    this.proyectoService.deleteProyecto(proyecto.id).subscribe(myObserver);
  }

  grabar(){
    if(this.formItem.invalid){
      this.toastService.show('Formulario Invalido.', {classname: 'bg-danger text-light'});
      return;
    }

    const itemCopy = { ...this.formItem.value };
    
    const requestBody = {
      id: itemCopy.id,
      nombre: itemCopy.nombre,
      descripcion: itemCopy.descripcion,
      link: itemCopy.link
    }

    const postObserver = {
      next: (data: any) => {
        this.toastService.show('Cambios realizados correctamente.', {classname: 'bg-success text-light'});
        this.editaOAgrega = false;
        this.cargarProyectos();

      },
      error: (err: any) => {
        this.toastService.show('Error al intentar grabar los cambios realizados.', {classname: 'bg-danger text-light'});

      }
    };
    this.proyectoService.postProyecto(requestBody).subscribe(postObserver);
  }

  cancelar(){
    this.editaOAgrega = false;
    this.formItem.reset({});
  }

}
