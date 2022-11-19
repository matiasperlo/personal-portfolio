import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  isSubmitting = false;
  errorLog = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.authForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  ngOnInit(): void {
    // De momento solo funcionara el login
  }

  submitForm(){
    console.log("Haciendo el submit");
    this.isSubmitting = true;

    const credentials = this.authForm.value;
    console.log(credentials);

    const observer = {
      next: (data: any) => {
        this.router.navigateByUrl('/');
        this.isSubmitting = false;
        this.errorLog = false;
      },
      error: (err: any) => {
        console.log('Error al loguear');
        this.isSubmitting = false;
        this.errorLog = true;
      }
    }

    this.userService
      .attemptAuth(credentials)
      .subscribe(observer);
  }

}
