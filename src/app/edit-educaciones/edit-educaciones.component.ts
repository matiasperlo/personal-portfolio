import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  editaOAgrega: boolean = false;
  edita: boolean = false;
  nuevoInstituto: boolean = false;
  mostrarSuccess: boolean = false;
  mostrarError: boolean = false;
  formItem: FormGroup;
  formInstituto: FormGroup;

  constructor(
    private educacionService: EducacionService,
    private institucionService: InstitutoService,
    private fb: FormBuilder
  ) { 

    this.formItem = this.fb.group({});
    this.formInstituto = this.fb.group({});
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

    this.formInstituto = this.fb.group({
      nombre: ['', [Validators.required]],
      logo: ['', [Validators.required]]
    })
  }

  cargarEducaciones() {
    const myObserver = {
      next: (data: any) => {
        this.educaciones = data;
      },
      error: (err: any) => {
        console.log("Error al obtener las educaciones");
      }
    }

    this.educacionService.getEducaciones().subscribe(myObserver);
  }

  cargarInstituciones(next_func: any = null){
    const myObserver = {
      next: (data:any) => {
        this.instituciones = data;
        next_func();
      },
      error: (error: any) => {
        console.log("Error al cargar las instituciones");
      }
    }

    this.institucionService.getInstituciones().subscribe(myObserver);
  }

  editarItem(id: number){
    this.editaOAgrega = true;
    this.edita = true;


    // logica que se ejecuta solo si todavia no se cargaron las instituciones.
    const continuar = () => {
      const item: Educacion = this.educaciones[id]; 
      this.formItem.reset({
        titulo: item.titulo,
        instituto: this.instituciones.findIndex(insti => insti.id == item.instituto.id),
        fechainicio: item.fechainicio,
        fechafin: item.fechafin
      });
      console.log("editar la edu: " + id);
    };

    if(this.instituciones.length != 0){
      continuar();
    } else {
      this.cargarInstituciones(continuar);
    }
    
  }



  crearItem(){
    this.editaOAgrega = true;
    this.edita = false;

    this.cargarInstituciones();

    this.formItem.reset({});
    console.log("creando nueva edu");
  }

  cancelar(){
    this.editaOAgrega = false;
  }

  grabar(){

    // if(this.nuevoInstituto){
    //   if (this.formInstituto.invalid){
    //     return;
    //   }

    //   const itemCopyInst = { ...this.formInstituto.value };
    //   const postIntitutoObserver = {
    //     next: (data: any) => {
    //       console.log(data);
    //       this.cargarInstituciones();
    //     },
    //     error: (err: any) => {
    //       console.log(err);
    //     }
    //   };
      
    //   this.institucionService.postInstituto(itemCopyInst).subscribe(postIntitutoObserver);
    // }

    if (this.formItem.invalid){
      return;
    }

    const itemCopy = { ...this.formItem.value };
    const dataRequest = {
      titulo: itemCopy.titulo,
      instituto: itemCopy.instituto,
      fechainicio: itemCopy.fechainicio,
      fechafin: itemCopy.fechafin
    };

    const requestObserver = {
      next: (res: any) => {
        console.log(res);
        this.mostrarSuccess = true;
        this.cargarEducaciones();
      },
      error: (err: any) => {
        this.mostrarError = true;
        console.log(err);
      }
    };

    console.log(dataRequest);
    this.educacionService.postEducacion(dataRequest).subscribe(requestObserver);
    this.editaOAgrega = false;
  }

  eliminarItem(id: number){
    const item = this.educaciones[id];
    const deleteObserver = {
      next: (res: any) => {
        console.log('response: ' + res);
        this.mostrarSuccess = true;
        this.cargarEducaciones();
      },
      error: (err: any) => {
        this.mostrarError = true;
        console.log('error: ' + err);
      }
    }

    this.educacionService.deleteEducacion(item.id).subscribe(deleteObserver);
  }

}
