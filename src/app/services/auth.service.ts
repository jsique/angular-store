/**
 * in this section we import all the libraries, services and components, especially those of firebase
 * for my project use firestore DataBase as a base to do what was requested in the project
 */
import { Injectable,NgZone  } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;
  constructor(
    private afauth: AngularFireAuth
    , private router: Router
    ,public afs: AngularFirestore
    ,public ngZone: NgZone ) { 
    
    /**
     * the user's localstorege is initialized if it is already authenticated
     * we use the model or user interface to be able to make use of the data returned by the firebase authentication
     */
    this.afauth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  /**
   * function where we receive the authentication data and using the model we match the data for later use
   * @param userdata array when firebase authentication is valid
   * @returns returns true when the user exists
   * function where we receive the authentication data and using the model we match the data for later use
   */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  /**
   * log out function
   * @returns function to exit the system and return to login
   */
  SignOut() {
    return this.afauth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }

  /**
   * credential authentication
   * @param email user mail
   * @param password user password
   * @returns if the credentials are correct enter the system otherwise continue in the login
   */
  SignIn (email: string, password: string) {
    return this.afauth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        return false
      });
  }
  /*
   * validates that there is a user in the localStorage to be able to enter the routes
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }
}
