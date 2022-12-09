import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Educacion } from '../shared/models/educacion';
import { Instituto } from '../shared/models/instituto';
import { EducacionService } from '../shared/services/educacion.service';
import { InstitutoService } from '../shared/services/instituto.service';

enum LogStatus {
  HIDDEN          = "HIDDEN",
  SUCCESS         = "SUCCESS",
  ERROR           = "ERROR",
  ERROR_FORM      = "ERROR_FORM",
  ERROR_DELETING  = "ERROR_DELETING",
  ERROR_UPDATING  = "ERROR_UPDATING",
  ERROR_FORBIDEN  = "ERROR_FORBIDEN"
}

@Component({
  selector: 'app-edit-educaciones',
  templateUrl: './edit-educaciones.component.html',
  styleUrls: ['./edit-educaciones.component.css']
})
export class EditEducacionesComponent implements OnInit {
  
  
  educaciones: Educacion[] = [];
  instituciones: Instituto[] = [];

  onForm: boolean = false;
  logStatus: LogStatus = LogStatus.HIDDEN;
  msgStyles = {
    "alert-success": this.logStatus == LogStatus.SUCCESS,
    "alert-danger": this.logStatus == LogStatus.ERROR
  }

  formItem: FormGroup;

  constructor(
    private educacionService: EducacionService,
    private institucionService: InstitutoService,
    private fb: FormBuilder,
    private router: Router
  ) { 

    this.formItem = this.fb.group({});
    this.logStatus
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
        // TODO: manejar el forbidden aca
        console.log("On error cargarEducaciones");
        console.log(err);

        this.logStatus = LogStatus.ERROR_FORBIDEN;
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
        this.logStatus = LogStatus.ERROR;
        //console.log("Error al cargar las instituciones");
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
        this.logStatus = LogStatus.SUCCESS;
        this.cargarEducaciones();
      },
      error: (err: any) => {
        this.logStatus = LogStatus.ERROR;
      }
    };

    this.educacionService.postEducacion(dataRequest).subscribe(requestObserver);
    this.onForm = false;
  }

  eliminarItem(edu: Educacion){
    const item = edu;
    const deleteObserver = {
      next: (res: any) => {
        this.logStatus = LogStatus.SUCCESS;
        this.cargarEducaciones();
      },
      error: (err: any) => {
        this.logStatus = LogStatus.SUCCESS;
      }
    }

    this.educacionService.deleteEducacion(item.id).subscribe(deleteObserver);
  }

  navegarA(url: string){
    this.router.navigateByUrl(url);
  }

  onCloseLog(){
    this.logStatus = LogStatus.HIDDEN;
  }

}
