import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-sobremi',
  templateUrl: './sobremi.component.html',
  styleUrls: ['./sobremi.component.css'],
})
export class SobremiComponent implements OnInit {
  txtSobreMi: string = '';

  constructor(private userdata: PerfilService) {}

  ngOnInit(): void {
    this.cargarDatosPerfil();
  }

  cargarDatosPerfil() {
    const myObserver = {
      next: (res: Perfil[]) => {
        this.txtSobreMi = res[0].sobremi;
      },
      error: (err: any) => {
        this.txtSobreMi = 'Error downloading user data';
      },
    };
    this.userdata.getPerfil().subscribe(myObserver);
  }
}
