import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPerfilRoutingModule } from './edit-perfil-routing.module';
import { EditPerfilComponent } from './edit-perfil.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditPerfilComponent
  ],
  imports: [
    CommonModule,
    EditPerfilRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EditPerfilModule { }
