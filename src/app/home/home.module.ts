import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeAuthResolverService } from './home-auth-resolver.service';
import { SharedModule } from '../shared/shared.module';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { AvatarImageComponent } from './avatar-image/avatar-image.component';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    HomeComponent,
    EditButtonComponent,
    AvatarImageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers:[
    HomeAuthResolverService,
    { provide: LOCALE_ID, useValue: 'es' }
  ]
})
export class HomeModule { }
