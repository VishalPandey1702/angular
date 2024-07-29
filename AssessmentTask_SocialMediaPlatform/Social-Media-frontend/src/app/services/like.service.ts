import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Like } from '../models/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl = 'http://localhost:5182/Like'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getLikes(): Observable<Like[]> {
    return this.http.get<Like[]>(this.apiUrl);
  }

  createLike(like: Like): Observable<Like> {
    return this.http.post<Like>(this.apiUrl, like);
  }

  deleteLike(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
