import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;
  name: string;

  constructor(public authService: AuthService) { }

  signup() {
    this.authService.signup(this.email, this.password, this.name);
    this.email = this.password = '';
  }

  ngOnInit() {
  }

}
