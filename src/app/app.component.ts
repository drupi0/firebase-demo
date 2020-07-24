import { Component } from '@angular/core';

interface PostCard {
  owner: string;
  message: string;
  timestamp: string;
  color: string;
}

const RANDOMCOLOR = () =>
  ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'][
    Math.floor(Math.random() * Math.floor(6))
  ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'firebase-demo';
  posters: PostCard[] = [];

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
