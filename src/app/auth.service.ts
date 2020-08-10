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

  retrieveAuthState(triggerSignIn: boolean = false, isAnon: boolean = false) {
    return this.authService.authState.pipe(
      switchMap((user) => {
        return !user && triggerSignIn
          ? !isAnon
            ? this.signInWithGoogle()
            : this.signInAnon()
          : of(user);
      }),
      take(1)
    );
  }

  signInWithGoogle() {
    return from(
      this.authService.signInWithPopup(new auth.GoogleAuthProvider())
    ).pipe(map((creds) => creds.user));
  }

  signInAnon() {
    return from(this.authService.signInAnonymously()).pipe(
      map((creds) => creds.user)
    );
  }

  logOut() {
    this.authService.signOut();
  }
}
