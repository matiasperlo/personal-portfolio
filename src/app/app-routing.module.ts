import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/admin-guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'edit-perfil', loadChildren: () => import('./edit-perfil/edit-perfil.module').then(m => m.EditPerfilModule), canActivate: [AdminGuard] },
  { path: 'edit-proyectos', loadChildren: () => import('./edit-proyectos/edit-proyectos.module').then(m => m.EditProyectosModule), canActivate: [AdminGuard] },
  { path: 'edit-educaciones', loadChildren: () => import('./edit-educaciones/edit-educaciones.module').then(m => m.EditEducacionesModule), canActivate: [AdminGuard] },
  { path: 'edit-habilidades', loadChildren: () => import('./edit-habilidades/edit-habilidades.module').then(m => m.EditHabilidadesModule), canActivate: [AdminGuard] },
  { path: 'edit-experiencias', loadChildren: () => import('./edit-experiencias/edit-experiencias.module').then(m => m.EditExperienciasModule), canActivate: [AdminGuard] },
  { path: 'forbidden', loadChildren: () => import('./error/forbidden/forbidden.module').then(m => m.ForbiddenModule)},
  { path: 'not-found', loadChildren: () => import('./error/not-found/not-found.module').then(m => m.NotFoundModule)},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' } // 404 NOT FOUND LOGICO 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
