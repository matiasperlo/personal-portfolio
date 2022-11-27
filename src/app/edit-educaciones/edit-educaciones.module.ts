import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditEducacionesRoutingModule } from './edit-educaciones-routing.module';
import { EditEducacionesComponent } from './edit-educaciones.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditEducacionesComponent
  ],
  imports: [
    CommonModule,
    EditEducacionesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EditEducacionesModule { }
