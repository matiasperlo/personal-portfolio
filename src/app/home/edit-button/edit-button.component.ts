import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.css']
})
export class EditButtonComponent implements OnInit {

  @Input() url: string;
  available: boolean;

  constructor(
    private router: Router,
    private userService: UserService
  ) { 
    this.url = "perfil";
    this.available = false;
  }

  ngOnInit(): void {
    this.runObserver();
  }

  onClick(){
    this.router.navigateByUrl('edit-' + this.url);
  }

  private runObserver(){
    const availableObserver = {
      next: (data: User) => {
        if (data.username == "admin"){
          this.available = true;
        }
        else {
          this.available = false;
        }
      },
      error: (err: any) => {
        this.available = false;
      }
    };

    this.userService.currentUser.subscribe(availableObserver);
  }

}
