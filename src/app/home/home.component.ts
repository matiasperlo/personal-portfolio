import { Component, OnInit } from '@angular/core';
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

  constructor(
    private feedService: FeedService
  ) { }

  ngOnInit(): void {
    this.cargarFeed();
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
}
