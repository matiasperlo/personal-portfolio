import { Component, OnInit, TemplateRef } from '@angular/core';
import { Toast, ToastService } from '../../root/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css'],
})
export class ToastsComponent {

  constructor(public toastService: ToastService) {}

  isTemplate(toast: Toast) { return toast.textOrTpl instanceof TemplateRef; }

}
