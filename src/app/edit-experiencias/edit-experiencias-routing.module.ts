import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExperienciasComponent } from './edit-experiencias.component';

const routes: Routes = [{ path: '', component: EditExperienciasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditExperienciasRoutingModule { }
