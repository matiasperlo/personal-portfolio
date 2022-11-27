import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEducacionesComponent } from './edit-educaciones.component';

const routes: Routes = [{ path: '', component: EditEducacionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditEducacionesRoutingModule { }
