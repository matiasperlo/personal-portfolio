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

  foto_portada_preview: string = "";

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
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      rol: ['', [Validators.required, Validators.maxLength(100)]],
      foto_perfil: ['', [Validators.required, Validators.maxLength(400)]],
      foto_portada: ['', [Validators.required, Validators.maxLength(400)]],
      desc_sobremi: ['',[Validators.required, Validators.maxLength(420)]],
      email: ['', [Validators.required, Validators.maxLength(100)]]
    });

    this.formPerfil.valueChanges.subscribe({
      next: (value: any) => {
        this.foto_portada_preview = this.formPerfil.value.foto_portada;
      }
    })
    this.cargarDatosPerfil();
  }

  cargarDatosPerfil(){
    const myObserver = {
      next: (data: Perfil[]) => {
        this.datosPerfil = data[0];
        this.formPerfil.reset({
          id: this.datosPerfil?.id,
          nombre: this.datosPerfil?.nombre,
          rol: this.datosPerfil?.rol,
          foto_perfil: this.datosPerfil?.foto_perfil,
          foto_portada: this.datosPerfil?.foto_portada,
          desc_sobremi: this.datosPerfil?.desc_sobremi,
          email: this.datosPerfil?.email
        });
        this.foto_portada_preview = this.datosPerfil?.foto_portada;

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


      this.perfilService.postPerfil(requestBody).subscribe(postObserver);
    }

    navegarA(path: string){
      this.router.navigateByUrl(path);
    }
  }