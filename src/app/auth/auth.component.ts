import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationError } from '../core/models/authentication-error';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  currentError: string = "";
  errors = {
    usuarioExistente: "Usuario Existente",
    usuarioNoExiste : "El Usuario ingresado no existe",
    passwordInvalido: "La Contraseña es inválida",
    camposInvalidos : "Los campos son inválidos, revise que cumplan los requisitos y vuelva a intentarlo"
  };

  authObserver = {
    next: (data: any) => {

      console.log("reading next");

      if(this.userService.isUser(data)){
        this.router.navigateByUrl('/');
        return;
      }

      this.currentError = this.errors["usuarioExistente"];
    },
    error: (err: HttpErrorResponse) => {
      let errBody: AuthenticationError = err.error;
      if (errBody.badPassword) this.currentError = this.errors["passwordInvalido"];
      if (errBody.userAlreadyExists) this.currentError = this.errors["usuarioExistente"];
      if (errBody.userNotExists) this.currentError = this.errors["usuarioNoExiste"];
    }
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.authForm = fb.group({
      'username': ['', [Validators.required, Validators.maxLength(25), Validators.minLength(5)]],
      'password': ['', [Validators.required, Validators.maxLength(15), Validators.minLength(5), Validators.pattern('^[A-Za-z0-9]+$')]]
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit(){

    if (this.authForm.invalid){
      this.currentError = this.errors["camposInvalidos"];
      return;
    }
    const credentials = this.authForm.value;

    this.userService
      .attemptAuth(credentials)
      .subscribe(this.authObserver);
  }

  onRegister(){

    if (this.authForm.invalid){
      this.currentError = this.errors["camposInvalidos"];
      return;
    }

    const credentials = this.authForm.value;

    this.userService
      .register(credentials)
      .subscribe(this.authObserver);
  }
}
