import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase';
import { switchMap, map, tap, take } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authService: AngularFireAuth) {}

  retrieveAuthState(triggerSignIn: boolean = false) {
    return this.authService.authState.pipe(
      switchMap((user) => {
        return !user && triggerSignIn ? this.signInWithGoogle() : of(user);
      }),
      take(1)
    );
  }

  signInWithGoogle() {
    return from(
      this.authService.signInWithPopup(new auth.GoogleAuthProvider())
    ).pipe(map((creds) => creds.user));
  }

  logOut() {
    this.authService.signOut();
  }
}
