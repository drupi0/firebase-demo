import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { PostCard } from './store.service';

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
  posters: PostCard[] = [];
  isLoggedIn = false;
  authState: Observable<User>;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.logIn(false);
  }

  logIn(triggerSignIn: boolean = true) {
    if (!this.isLoggedIn) {
      this.authService.retrieveAuthState(triggerSignIn).subscribe((user) => {
        if (user) {
          this.isLoggedIn = true;
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

  addCard() {
    const newPost = {
      owner: Math.random().toString(36).substring(7),
      message: Math.random().toString(36),
      timestamp: '1234',
      color: RANDOMCOLOR(),
    };

    this.posters.push(newPost);
    this.posters.reverse();
  }
}
