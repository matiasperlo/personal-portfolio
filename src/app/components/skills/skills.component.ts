import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  constructor(private skillsdata: SkillsService) { }

  ngOnInit(): void {
    this.cargarSkills();
  }

  cargarSkills(){
    const mySubscriber = {
      next: (res: Skill[]) => {
        this.skills = res;
      }
    }
    this.skillsdata.getSkills().subscribe(mySubscriber);
  }
}
