import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAuthedDirective } from './show-authed.directive';



@NgModule({
  declarations: [
    ShowAuthedDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowAuthedDirective
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