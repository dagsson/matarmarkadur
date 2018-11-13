import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
>>>>>>> origin/master
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

<<<<<<< HEAD
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
=======
  constructor(private firebaseAuth: AngularFireAuth) {
>>>>>>> origin/master
    this.user = firebaseAuth.authState;
   }

   signup(email: string, password: string, name: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
<<<<<<< HEAD
        this.router.navigate(['/welcome']);
=======
>>>>>>> origin/master
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}
