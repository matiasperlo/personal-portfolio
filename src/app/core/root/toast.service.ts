import { Injectable, TemplateRef } from '@angular/core';

export interface Toast {
  text: string;
  options: any;
  classname: string;
  delay: number;
}

export enum ToastMessages {
  ERROR       = "Ocurrió un error inesperado.",
  E_GRABAR    = "No se pudieron grabar los cambios, reiSnténtelo más tarde.",
  E_ELIMINAR  = "No se pudo eliminar el registro.",
  E_LISTADO   = "No se pudo cargar la lista de items",
  E_CAMPOS_INVALIDOS = "Formulario Invalido, revise los campos y vuelva a intentarlo.",
  
  SUCCESS     = "Éxito.",
  S_GRABAR    = "Cambios realizados exitosamente.",
  S_ELIMINAR  = "Registro eliminado exitosamente."
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  show(text: string , options: any = {}) {
    this.toasts.push({ text, ...options });
  }
  
  showError(text: string = ToastMessages.ERROR ){
    this.show(text, {classname: 'bg-danger text-light'});
  }

  showSuccess(text: string = ToastMessages.SUCCESS ){
    this.show(text, {classname: 'bg-success text-light'});
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
