import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private apiUrl = 'http://localhost:5182/api/feed';  // Update with your API URL

  constructor(private http: HttpClient) {}

  getFeed(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  likePost(postId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/like`, { postId });
  }

  commentOnPost(postId: number, content: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/comment`, { postId, content });
  }
}
