import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../core';

/*
*/
@Directive({
  selector: '[appVerCuandoLogin]'
})
export class VerCuandoLoginDirective implements OnInit{
  
  condition: boolean = true; // decision si necesita visualizar cuando hay login o no
  
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) { }


  /* 
      La idea de esta directiva es que se comunique con los servicios
      y maneje la lógica para la visualización de algunos aspectos
      de los componentes que varían dependiendo si el usuario está
      o no logueado, como si se tratase de un ngIf compartido entre los 
      componentes
  */
  ngOnInit(): void {
    const authObserver = {
      next: (estaLogueado: boolean) => {
        
        if(this.condition && estaLogueado || !this.condition && !estaLogueado ){
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        
        }
      }
    }
    this.userService.isAuthenticated.subscribe(authObserver);
    
    
  }

  @Input() set appVerCuandoLogin(condition: boolean){
    this.condition = condition;
  }
}
