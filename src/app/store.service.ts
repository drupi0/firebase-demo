import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { map, tap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { PostCard } from './posts.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  readonly COLLECTION_NAME = 'posts';
  private collection: AngularFirestoreCollection<PostCard>;

  constructor(private angularFireStore: AngularFirestore) {
    this.collection = this.angularFireStore.collection(this.COLLECTION_NAME);
  }

  retrievePosts(): Observable<any[]> {
    return this.collection
      .valueChanges()
      .pipe(map((postCards) => postCards.sort((a, b) => b.time - a.time)));
  }

  createPost(post: PostCard) {
    return from(
      this.collection.add({
        ...post,
        time: new Date().getTime(),
      })
    );
  }

  deletePost() {}
}
