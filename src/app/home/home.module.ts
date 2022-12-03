import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeAuthResolverService } from './home-auth-resolver.service';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { AppModule } from '../app.module';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { AvatarImageComponent } from './avatar-image/avatar-image.component';


@NgModule({
  declarations: [
    HomeComponent,
    EditButtonComponent,
    AvatarImageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    // AppModule, 
    HomeRoutingModule,
    SharedModule
  ],
  providers:[
    HomeAuthResolverService,
  ]
})
export class HomeModule { }
