import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../core/services/user.service';

@Directive({
  selector: '[appShowAuthed]'
})
export class ShowAuthedDirective implements OnInit {
  condition: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) { }


  ngOnInit(): void {
    const myObserver = {
      next: (isAuthenticated: any) => {
        this.viewContainer.createEmbeddedView(this.templateRef);
        // if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
        //   this.viewContainer.createEmbeddedView(this.templateRef);
        // } else {
        //   this.viewContainer.clear();
        // }
      }
    };
    this.userService.isAuthenticated.subscribe(
      myObserver
    );
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }

}
