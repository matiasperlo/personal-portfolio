import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-image',
  templateUrl: './avatar-image.component.html',
  styleUrls: ['./avatar-image.component.css']
})
export class AvatarImageComponent implements OnInit {

  @Input() urlImage: string = "";
  @Input() urlEdit: string  = "";
  @Input() editable: boolean= false;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
