import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { FormloginComponent } from './components/formlogin/formlogin.component';
import { FormexperienciaComponent } from './components/formexperiencia/formexperiencia.component';
import { FormproyectoComponent } from './components/formproyecto/formproyecto.component';
import { FormeducacionComponent } from './components/formeducacion/formeducacion.component';
import { FormskillComponent } from './components/formskill/formskill.component';
import { FormsocialComponent } from './components/formsocial/formsocial.component';
import { MuroComponent } from './components/muro/muro.component';
import { PortadaComponent } from './components/portada/portada.component';
import { SobremiComponent } from './components/sobremi/sobremi.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { EducacionesComponent } from './components/educaciones/educaciones.component';
import { ExperienciasComponent } from './components/experiencias/experiencias.component';
import { DespedidaComponent } from './components/despedida/despedida.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { SkillComponent } from './components/skill/skill.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    FormloginComponent,
    FormexperienciaComponent,
    FormproyectoComponent,
    FormeducacionComponent,
    FormskillComponent,
    FormsocialComponent,
    MuroComponent,
    PortadaComponent,
    SobremiComponent,
    SkillsComponent,
    ProyectosComponent,
    EducacionesComponent,
    ExperienciasComponent,
    DespedidaComponent,
    EducacionComponent,
    ProyectoComponent,
    SkillComponent,
    ExperienciaComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
