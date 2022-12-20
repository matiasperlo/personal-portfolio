import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from '../core/root/document.service';
import { ToastMessages, ToastService } from '../core/root/toast.service';
import { Skill } from '../shared/models/skill';
import { SkillsService } from '../shared/services/skills.service';

@Component({
  selector: 'app-edit-habilidades',
  templateUrl: './edit-habilidades.component.html',
  styleUrls: ['./edit-habilidades.component.css']
})
export class EditHabilidadesComponent implements OnInit {

  habilidades: Skill[] = [];

  editaOAgrega: boolean = false;
  edita: boolean = false;
  formItem: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private habilidadService: SkillsService,
    public router: Router,
    public toastService: ToastService,
    private documentService: DocumentService
  ) { 
    this.formItem = this.fb.group({});
    this.documentService.setSubTitle('Habilidades');
  }

  ngOnInit(): void {
    this.formItem = this.fb.group({
      id: [null, []],
      nombre: ['', [Validators.required]],
      progreso: [null, [Validators.required]]
    })
    this.cargarHabilidades();
  }

  cargarHabilidades(){
    const myObserver = {
      next: (data: any) => {
        this.habilidades = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    };

    this.habilidadService.getSkills().subscribe(myObserver);
  }

  crearItem(){
    this.editaOAgrega = true;
    this.edita = false;

    this.formItem.reset({});
  }

  editarItem(skill: Skill){
    this.editaOAgrega = true;
    this.edita = true;

    const item: Skill = skill;
    this.formItem.reset({
      id: item.id,
      nombre: item.nombre,
      progreso: item.progreso
    });
  }

  eliminarItem(skill: Skill){
    const deleteObserver = {
      next: (res: any) => {
        console.log('response: ' + res);
        this.toastService.showSuccess(ToastMessages.S_ELIMINAR);
        this.cargarHabilidades();
      },
      error: (err: any) => {
        this.toastService.showError(ToastMessages.E_ELIMINAR);
        console.log('error: ' + err); 
      }
    }

    this.habilidadService.deleteHabilidad(skill.id).subscribe(deleteObserver);
  }

  grabar(){
    if (this.formItem.invalid){
      console.log("Formulario invalido");
      return;
    }

    const itemCopy = { ...this.formItem.value };
    const dataRequest = {
      id: itemCopy.id,
      nombre: itemCopy.nombre,
      progreso: itemCopy.progreso
    };

    const requestObserver = {
      next: (res: any) => {
        console.log(res);
        this.toastService.showSuccess(ToastMessages.S_GRABAR);
        this.cargarHabilidades();
      },
      error: (err: any) => {
        this.toastService.showError(ToastMessages.E_GRABAR);
      }
    };

    console.log(dataRequest);
    this.habilidadService.postHabilidad(dataRequest).subscribe(requestObserver);
    this.editaOAgrega = false;
  }

  cancelar(){
    this.editaOAgrega = false;
  }
}
