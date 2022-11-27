import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'edit-perfil', loadChildren: () => import('./edit-perfil/edit-perfil.module').then(m => m.EditPerfilModule) },
  { path: 'edit-proyectos', loadChildren: () => import('./edit-proyectos/edit-proyectos.module').then(m => m.EditProyectosModule) },
  { path: 'edit-educaciones', loadChildren: () => import('./edit-educaciones/edit-educaciones.module').then(m => m.EditEducacionesModule) },
  { path: 'edit-habilidades', loadChildren: () => import('./edit-habilidades/edit-habilidades.module').then(m => m.EditHabilidadesModule) },
  { path: 'edit-experiencias', loadChildren: () => import('./edit-experiencias/edit-experiencias.module').then(m => m.EditExperienciasModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
