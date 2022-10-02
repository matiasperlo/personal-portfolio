import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css'],
})
export class PortadaComponent implements OnInit {
  formLogin: FormGroup;
  messageErr: string;
  messageOk: string;
  mensajesError = {
    LOG: 'No se encontro el usuario solicitado',
    REG: 'Nombre de usuario ya existente'
  };
  mensajesExito = {
    LOG: 'Login Exitoso',
    REG: 'Usuario Registrado exitosamente'
  };

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder, private modalService: NgbModal) {
    this.formLogin = fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.messageErr = '';
    this.messageOk = '';
  }

  ngOnInit(): void {}

  mostrarFormLogin(){
    this.messageErr = '';
    this.messageOk = '';

    this.formLogin.reset({ usuario: '', password: '' });
  }

  private setMsgError(msg: string){
    this.messageErr = msg;
    this.messageOk = '';
  }

  private setMsgOk(msg: string){
    this.messageErr = '';
    this.messageOk = msg;
  }

  login() {

    if (this.formLogin.invalid) {
      // debe indicar que se indico un campo como invalido
      return;
    }

    if (
      !this.usuarioService.login(
        this.formLogin.get('usuario')?.value,
        this.formLogin.get('password')?.value
      )
    ) {
      // no se logro el login porque no se encontro el usuario indicado
      this.setMsgError(this.mensajesError['LOG']);
      return;
    }

    this.setMsgOk(this.mensajesExito['LOG']);
  }

  register() {

    if (this.formLogin.invalid) {
      // debe indicar que se indico un campo como invalido
      this.messageErr = 'mal el form'
      return;
    }

    if (
      !this.usuarioService.register(
        this.formLogin.get('usuario')?.value,
        this.formLogin.get('password')?.value
      )
    ) {
      // no se logro el login porque no se encontro el usuario indicado
      this.setMsgError(this.mensajesError['REG']);
      return;
    }

    this.setMsgOk(this.mensajesExito['REG']);
  }

  open(content: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}
