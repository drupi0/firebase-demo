import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { StoreService } from './store.service';
import { tap, finalize } from 'rxjs/operators';
import { PostCard } from './posts.model';

const RANDOMCOLOR = () =>
  ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'][
    Math.floor(Math.random() * Math.floor(6))
  ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'firebase-demo';
  posters: Observable<PostCard[]>;
  isLoggedIn = false;
  authState: Observable<User>;
  currentUser: User;
  message = '';

  constructor(
    private authService: AuthService,
    private storeService: StoreService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.logIn(false);
    this.posters = this.storeService.retrievePosts().pipe(
      tap((i) => {
        console.log(i);
      })
    );
  }

  logIn(triggerSignIn: boolean = true) {
    if (!this.isLoggedIn) {
      this.authService.retrieveAuthState(triggerSignIn).subscribe((user) => {
        if (user) {
          this.isLoggedIn = true;
          this.currentUser = user;
        }
      });
    } else {
      this.isLoggedIn = false;
      this.logOut();
    }
  }

  logOut() {
    this.authService.logOut();
  }

  addCard(event: KeyboardEvent) {
    if (
      this.message.trim().length === 0 &&
      event.key.toLowerCase() === 'enter'
    ) {
      event.preventDefault();
      return;
    }

    if (this.message.trim().length >= 60) {
      event.preventDefault();
    }

    if (event.key.toLowerCase() === 'enter') {
      event.preventDefault();
      this.storeService.createPost({
        owner: this.currentUser.displayName || 'anon',
        message: this.message.trim(),
        color: RANDOMCOLOR(),
      });
      this.message = '';
    }
  }
}
