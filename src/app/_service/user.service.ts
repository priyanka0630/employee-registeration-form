import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  public eventHelper = new Subject<{ prev: boolean; next: boolean }>();

  constructor(private http: HttpClient) { }

  url = 'assets/country.json';

  getAll(): any {
    return this.http.get<any>(this.url);
  }

  getUser() {
    return this.http.get<User[]>(`/users`);
  }

  register(user: User) {
    console.log(this.http.post(`/users/register`, user))
    return this.http.post(`/users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }

  get windowRef() {
    return window
  }
}