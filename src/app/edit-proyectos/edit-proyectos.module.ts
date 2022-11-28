import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProyectosRoutingModule } from './edit-proyectos-routing.module';
import { EditProyectosComponent } from './edit-proyectos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EditProyectosComponent
  ],
  imports: [
    CommonModule,
    EditProyectosRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EditProyectosModule { }
