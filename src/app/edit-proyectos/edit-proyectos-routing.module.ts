import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProyectosComponent } from './edit-proyectos.component';

const routes: Routes = [{ path: '', component: EditProyectosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProyectosRoutingModule { }
