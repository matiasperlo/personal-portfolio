import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeAuthResolverService } from './home-auth-resolver.service';
import { SharedModule } from '../shared/shared.module';
import { PerfilService } from './services/perfil.service';
import { EducacionService } from './services/educacion.service';
import { ExperienciaService } from './services/experiencia.service';
import { ProyectosService } from './services/proyectos.service';
import { SkillsService } from './services/skills.service';
import { UsuarioService } from './services/usuario.service';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers:[
    HomeAuthResolverService,
    PerfilService,
    EducacionService,
    ExperienciaService,
    ProyectosService,
    SkillsService,
    UsuarioService,
    
  ]
})
export class HomeModule { }
