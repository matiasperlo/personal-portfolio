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
  authObserver = {
    next: (data: any) => {
      this.router.navigateByUrl('/');
      this.isSubmitting = false;
      this.errorLog = false;
    },
    error: (err: any) => {
      this.isSubmitting = false;
      this.errorLog = true;
    }
  }

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
    this.isSubmitting = true;
    const credentials = this.authForm.value;

    this.userService
      .attemptAuth(credentials)
      .subscribe(this.authObserver);
  }

  onRegister(){
    this.isSubmitting = true;
    const credentials = this.authForm.value;

    this.userService
      .register(credentials)
      .subscribe(this.authObserver);
  }

}
