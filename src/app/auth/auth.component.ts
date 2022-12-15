import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationError } from '../core/models/authentication-error';
import { DocumentService } from '../core/root/document.service';
import { ToastService } from '../core/root/toast.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  errors = {
    usuarioExistente: "Usuario Existente",
    usuarioNoExiste : "El Usuario ingresado no existe",
    passwordInvalido: "La Contraseña es inválida",
    camposInvalidos : "Los campos son inválidos, revise que cumplan los requisitos y vuelva a intentarlo"
  };

  authObserver = {
    next: (data: any) => {

      if(this.userService.isUser(data)){
        this.toastService.showSuccess('Login exitoso');
        this.router.navigateByUrl('/');
        return;
      }

      this.toastService.showError(this.errors["usuarioExistente"]);
    },
    error: (err: HttpErrorResponse) => {
      let errBody: AuthenticationError = err.error;
      if (errBody.badPassword) this.toastService.showError(this.errors["passwordInvalido"]);
      if (errBody.userAlreadyExists) this.toastService.showError(this.errors["usuarioExistente"]);
      if (errBody.userNotExists) this.toastService.showError(this.errors["usuarioNoExiste"]);
    }
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public toastService: ToastService,
    private documentService: DocumentService
  ) { 
    this.authForm = fb.group({
      'username': ['', [Validators.required, Validators.maxLength(25), Validators.minLength(5)]],
      'password': ['', [Validators.required, Validators.maxLength(15), Validators.minLength(5)]] // Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{5,32}$')
    });

    this.documentService.setSubTitle('Inicio de Sesion');
  }

  ngOnInit(): void {
    
  }

  onSubmit(){

    if (this.authForm.invalid){
      this.toastService.showError(this.errors["camposInvalidos"]);
      return;
    }
    const credentials = this.authForm.value;

    this.userService
      .attemptAuth(credentials)
      .subscribe(this.authObserver);
  }

  onRegister(){

    if (this.authForm.invalid){
      this.toastService.showError(this.errors["camposInvalidos"]);
      return;
    }

    const credentials = this.authForm.value;

    this.userService
      .register(credentials)
      .subscribe(this.authObserver);
  }
}
