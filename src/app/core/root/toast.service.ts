import { Injectable, TemplateRef } from '@angular/core';

export interface Toast {
  textOrTpl: string | TemplateRef<any> | any;
  options: any;
  classname: string;
  delay: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }
  
  showError(textOrTpl: string | TemplateRef<any>){
    this.show(textOrTpl, {classname: 'bg-danger text-light'});
  }

  showSuccess(textOrTpl: string | TemplateRef<any>){
    this.show(textOrTpl, {classname: 'bg-success text-light'});
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
