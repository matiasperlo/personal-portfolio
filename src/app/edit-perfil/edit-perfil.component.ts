import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Perfil } from '../shared/models/perfil';
import { PerfilService } from '../shared/services/perfil.service';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.component.html',
  styleUrls: ['./edit-perfil.component.css']
})
export class EditPerfilComponent implements OnInit {

  formPerfil: FormGroup;
  datosPerfil: Perfil | null = null;

  mostrarSuccess: boolean = false;
  mostrarError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilService
  ) { 
    this.formPerfil = this.fb.group({});

  }

  ngOnInit(): void {
    this.formPerfil = this.fb.group({
      nombre: ['', [Validators.required]],
      perfil: ['', [Validators.required]],
      fotoPerfil: ['', [Validators.required]],
      fotoPortada: ['', [Validators.required]],
      descSobreMi: ['',[Validators.required]]
    });
    this.cargarDatosPerfil();
  }

  cargarDatosPerfil(){
    const myObserver = {
      next: (data: any) => {
        this.datosPerfil = data;

      },
      error: (err:any) => {
        console.log(err);
      }
    }

      this.perfilService.getPerfil().subscribe(myObserver);
    }
    
    
    grabar(){

    }
  }