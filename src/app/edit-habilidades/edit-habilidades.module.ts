import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditHabilidadesRoutingModule } from './edit-habilidades-routing.module';
import { EditHabilidadesComponent } from './edit-habilidades.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditHabilidadesComponent
  ],
  imports: [
    CommonModule,
    EditHabilidadesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EditHabilidadesModule { }
