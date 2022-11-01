import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { Educacion } from './models/educacion';
import { Experiencia } from './models/experiencia';
import { Perfil } from './models/perfil';
import { Proyecto } from './models/proyecto';
import { Skill } from './models/skill';
import { EducacionService } from './services/educacion.service';
import { ExperienciaService } from './services/experiencia.service';
import { PerfilService } from './services/perfil.service';
import { ProyectosService } from './services/proyectos.service';
import { SkillsService } from './services/skills.service';

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

  constructor(
    private userData: UserService,
    private perfilData: PerfilService,
    private eduData: EducacionService,
    private expData: ExperienciaService,
    private proyectoData: ProyectosService,
    private skillsData: SkillsService 
  ) { }

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
    this.perfilData.getPerfil().subscribe(myObserver);
  }

  cargarEducaciones(){
    const mySubscriber = {
      next: (res: Educacion[]) => {
        this.educaciones = res;
      }
    }

    this.eduData.getEducaciones().subscribe(mySubscriber);
  }

  cargarExperiencias(){
    const mySubscriber = {
      next: (res: Experiencia[]) => {
        this.experiencias = res;
        console.log(res);
      }
    };
    this.expData.getExperiencias().subscribe(mySubscriber);
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
    this.skillsData.getSkills().subscribe(mySubscriber);
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
    this.perfilData.getPerfil().subscribe(myObserver);
  }
}
