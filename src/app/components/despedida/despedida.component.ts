import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-despedida',
  templateUrl: './despedida.component.html',
  styleUrls: ['./despedida.component.css']
})
export class DespedidaComponent implements OnInit {
  txtEmail: string = '';
  txtNombre: string = '';
  constructor(private userdata: PerfilService) { }

  ngOnInit(): void {
    this.cargarDatosPerfil();
  }

  cargarDatosPerfil() {
    const myObserver = {
      next: (res: Perfil[]) => {
        this.txtEmail = res[0].email;
        this.txtNombre = res[0].nombre;
      },
      error: (err: any) => {
        this.txtEmail = 'Error downloading user data';
      },
    };
    this.userdata.getPerfil().subscribe(myObserver);
  }
}
