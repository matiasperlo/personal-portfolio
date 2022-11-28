import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private perfilService: PerfilService,
    private router: Router
  ) { 
    this.formPerfil = this.fb.group({});

  }

  ngOnInit(): void {
    this.formPerfil = this.fb.group({
      id: [null, []],
      nombre: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      foto_perfil: ['', [Validators.required]],
      foto_portada: ['', [Validators.required]],
      desc_sobremi: ['',[Validators.required]],
      email: ['', [Validators.required]]
    });
    this.cargarDatosPerfil();
  }

  cargarDatosPerfil(){
    const myObserver = {
      next: (data: any) => {
        this.datosPerfil = data[0];
        this.formPerfil.reset({
          id: this.datosPerfil?.id,
          nombre: this.datosPerfil?.nombre,
          rol: this.datosPerfil?.rol,
          foto_perfil: this.datosPerfil?.foto_perfil,
          foto_portada: this.datosPerfil?.foto_portada,
          desc_sobremi: this.datosPerfil?.desc_sobremi,
          email: this.datosPerfil?.email
        })

      },
      error: (err:any) => {
        console.log(err);
      }
    }

      this.perfilService.getPerfil().subscribe(myObserver);
    }
    
    
    grabar(){

      if(this.formPerfil.invalid){
        console.log('formulario no valido');
        console.log(this.formPerfil.value);
        return;
      }

      const postObserver  = {
        next: (data: any) => {
          this.mostrarSuccess = true;
        },
        error: (err: any) => {
          this.mostrarError = true
        }
      }

      const itemCopy = { ...this.formPerfil.value };

      const requestBody = {
        id: this.datosPerfil?.id,
        nombre: itemCopy.nombre,
        rol: itemCopy.rol,
        foto_perfil: itemCopy.foto_perfil,
        foto_portada: itemCopy.foto_portada,
        desc_sobremi: itemCopy.desc_sobremi,
        email: itemCopy.email
      }

      console.log(requestBody);

      this.perfilService.postPerfil(requestBody).subscribe(postObserver);
    }

    navegarA(path: string){
      this.router.navigateByUrl(path);
    }
  }