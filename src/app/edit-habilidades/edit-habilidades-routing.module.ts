import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditHabilidadesComponent } from './edit-habilidades.component';

const routes: Routes = [{ path: '', component: EditHabilidadesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditHabilidadesRoutingModule { }
