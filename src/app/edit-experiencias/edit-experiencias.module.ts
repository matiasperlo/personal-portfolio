import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditExperienciasRoutingModule } from './edit-experiencias-routing.module';
import { EditExperienciasComponent } from './edit-experiencias.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditExperienciasComponent
  ],
  imports: [
    CommonModule,
    EditExperienciasRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EditExperienciasModule { }
