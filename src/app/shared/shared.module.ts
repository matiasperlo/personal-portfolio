import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header.component';
import { VerCuandoLoginDirective } from './ver-cuando-login.directive';



@NgModule({
  declarations: [
    VerCuandoLoginDirective,
    HeaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VerCuandoLoginDirective
  ]
})
export class SharedModule { }


// @NgModule({
//   imports: [
//     CommonModule,
//     FormsModule,
//     ReactiveFormsModule,
//     HttpClientModule,
//     RouterModule
//   ],
//   declarations: [
//     ArticleListComponent,
//     ArticleMetaComponent,
//     ArticlePreviewComponent,
//     FavoriteButtonComponent,
//     FollowButtonComponent,
//     ListErrorsComponent,
//     ShowAuthedDirective
//   ],
//   exports: [
//     ArticleListComponent,
//     ArticleMetaComponent,
//     ArticlePreviewComponent,
//     CommonModule,
//     FavoriteButtonComponent,
//     FollowButtonComponent,
//     FormsModule,
//     ReactiveFormsModule,
//     HttpClientModule,
//     ListErrorsComponent,
//     RouterModule,
//     ShowAuthedDirective
//   ]
// })