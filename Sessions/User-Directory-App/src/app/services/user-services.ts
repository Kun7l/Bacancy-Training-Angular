import { Injectable, signal } from '@angular/core';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  userList = signal<User[]>([
    {
      id: 0,
      name: 'Lewis Hamilton',
      followers: 1250,
      followings: 430,
      posts: [
        { id: 101, content: 'Just finished a 10km run! 🏃‍♂️', likes: 45 },
        {
          id: 102,
          content: 'Anyone have book recommendations for the weekend?',
          likes: 12,
        },
      ],
    },
    {
      id: 1,
      name: 'Max Verstappen',
      followers: 890,
      followings: 910,
      posts: [
        {
          id: 201,
          content: 'Cozy cafes are my love language. ☕✨',
          likes: 132,
        },
      ],
    },
    {
      id: 2,
      name: 'Oscar Piastri',
      followers: 3400,
      followings: 120,
      posts: [
        {
          id: 301,
          content: 'New project launch tomorrow! Stay tuned.',
          likes: 567,
        },
        { id: 302, content: 'The sunset tonight was incredible.', likes: 89 },
        { id: 303, content: 'Working from the park today.', likes: 42 },
      ],
    },
  ]);

  getAllUsers() {
    return this.userList();
  }

  getUserById(id: number): User {
    return this.userList().find((user) => user.id === id)!;
  }

  getPosts(id: number) {
    const user = this.userList().find((user) => user.id === id)!;
    return user.posts;
  }
}
