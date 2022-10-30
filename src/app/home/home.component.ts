import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  txtEmail: string = '';
  txtNombre: string = '';
  txtSobreMi: string = '';
  educaciones: Educacion[] = [];
  experiencias: Experiencia[] = [];
  proyectos: Proyecto[] = [];
  skills: Skill[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  cargarDatosPerfil() {
    const myObserver = {
      next: (res: Perfil[]) => {
        this.txtEmail = res[0].email;
        this.txtNombre = res[0].nombre;
      },
      error: (err: any) => {
        this.txtEmail = 'Error downloading user data';
      },
    };
    this.userdata.getPerfil().subscribe(myObserver);
  }

  cargarEducaciones(){
    const mySubscriber = {
      next: (res: Educacion[]) => {
        this.educaciones = res;
      }
    }

    this.edudata.getEducaciones().subscribe(mySubscriber);
  }

  cargarExperiencias(){
    const mySubscriber = {
      next: (res: Experiencia[]) => {
        this.experiencias = res;
        console.log(res);
      }
    };
    this.expdata.getExperiencias().subscribe(mySubscriber);
  }

  cargarProyectos(){
    const mySubcriber = {
      next: (res: Proyecto[]) => {
        this.proyectos = res;
      }
    };

    this.proyectoData.getProyectos().subscribe(mySubcriber);
  }

  cargarSkills(){
    const mySubscriber = {
      next: (res: Skill[]) => {
        this.skills = res;
      }
    }
    this.skillsdata.getSkills().subscribe(mySubscriber);
  }

  cargarDatosSobreMi() {
    const myObserver = {
      next: (res: Perfil[]) => {
        this.txtSobreMi = res[0].sobremi;
      },
      error: (err: any) => {
        this.txtSobreMi = 'Error downloading user data';
      },
    };
    this.userdata.getPerfil().subscribe(myObserver);
  }
}
