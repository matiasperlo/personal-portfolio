import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  mostrarSuccess: boolean = false;
  mostrarError: boolean = false;
  formItem: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectosService
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

    this.formItem = this.fb.group ({
      id: [null],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      link: ['']
    })
  }

  eliminarItem(proyecto: Proyecto){
    const myObserver = {
      next: (data: any) => {
        this.mostrarSuccess = true;
      },
      error: (err: any) => {
        this.mostrarError = true;
      }
    };

    this.proyectoService.deleteProyecto(proyecto.id).subscribe(myObserver);
  }

  grabar(){
    if(this.formItem.invalid){
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
        this.mostrarSuccess = true;
      },
      error: (err: any) => {
        this.mostrarError = true;
      }
    };
    this.proyectoService.postProyecto(requestBody).subscribe(postObserver);
  }

  cancelar(){
    this.editaOAgrega = false;
    this.formItem = this.fb.group({});
  }

}
