import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, tap } from 'rxjs/operators';

export interface PostCard {
  owner: string;
  message: string;
  timestamp: string;
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private angularFireStore: AngularFirestore) {}

  retrievePosts() {
    return this.angularFireStore
      .collection('posts')
      .valueChanges()
      .pipe(
        tap((data: []) => {
          console.log(data);
        })
      );
  }

  // createPost(post: PostCard) {
  //   this.angularFireStore.collection.
  // }

  deletePost() {}
}
