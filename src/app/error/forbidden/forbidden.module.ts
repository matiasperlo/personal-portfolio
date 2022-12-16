import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenComponent } from './forbidden.component';
import { ForbiddenRoutingModule } from './forbidden-routing.module';



@NgModule({
  declarations: [
    ForbiddenComponent
  ],
  imports: [
    CommonModule,
    ForbiddenRoutingModule
  ]
})
export class ForbiddenModule { }
