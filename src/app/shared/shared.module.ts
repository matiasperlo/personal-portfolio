import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerCuandoLoginDirective } from './ver-cuando-login.directive';
import { EducacionService } from './services/educacion.service';
import { ExperienciaService } from './services/experiencia.service';
import { PerfilService } from './services/perfil.service';
import { FeedService } from './services/feed.service';
import { ProyectosService } from './services/proyectos.service';
import { SkillsService } from './services/skills.service';
import { InstitutoService } from './services/instituto.service';
import { RolService } from './services/rol.service';
import { EmpresaService } from './services/empresa.service';
import { JornadaService } from './services/jornada.service';
import { PuestoService } from './services/puesto.service';



@NgModule({
  declarations: [
    VerCuandoLoginDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    VerCuandoLoginDirective,
  ],
  providers: [
    EducacionService,
    ExperienciaService,
    PerfilService,
    FeedService,
    ProyectosService,
    SkillsService,
    InstitutoService,
    RolService,
    EmpresaService,
    JornadaService,
    PuestoService
  ]
})
export class SharedModule { }