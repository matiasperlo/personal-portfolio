import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../core/models/user';
import { UserService } from '../core/services/user.service';
import { Educacion } from '../shared/models/educacion';
import { Experiencia } from '../shared/models/experiencia';
import { Feed } from '../shared/models/feed';
import { Perfil } from '../shared/models/perfil';
import { Proyecto } from '../shared/models/proyecto';
import { Skill } from '../shared/models/skill';
import { FeedService } from '../shared/services/feed.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  perfil: Perfil | null = null;
  educaciones: Educacion[] = [];
  experiencias: Experiencia[] = [];
  proyectos: Proyecto[] = [];
  skills: Skill[] = [];

  usuario: User | null = null ;

  constructor(
    private feedService: FeedService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarFeed();
    this.conocerUser();
  }

  conocerUser(){
    const userObserver = {
      next: (usr: any) => {
        this.usuario = usr;
      }
    };

    this.userService.currentUser.subscribe(userObserver);
  }

  cargarFeed(){
    const myObserver = {
      next: (res: Feed) => {
        this.perfil = res.perfil;
        this.educaciones = res.educaciones;
        this.experiencias = res.experiencias;
        this.skills = res.habilidades;
        this.proyectos = res.proyectos;
      }
    }

    this.feedService.getFeed().subscribe(myObserver);

  }

  logout(){
    this.userService.quitarLogin();
    this.router.navigateByUrl('/');
  }
  
}
