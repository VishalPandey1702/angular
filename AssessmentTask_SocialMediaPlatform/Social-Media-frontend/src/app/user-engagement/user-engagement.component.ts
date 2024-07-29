import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { LikeService } from '../services/like.service';
import { CommentService } from '../services/comment.service';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Like } from '../models/like';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-user-engagement',
  templateUrl: './user-engagement.component.html',
  styleUrls: ['./user-engagement.component.css']
})
export class UserEngagementComponent implements OnInit {
  users: User[] = [];
  posts: Post[] = [];
  likes: Like[] = [];
  comments: Comment[] = [];
  engagementScores: { user: User, score: number }[] = [];

  constructor(
    private userService: UserService,
    private postService: PostService,
    private likeService: LikeService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadPosts();
    this.loadLikes();
    this.loadComments();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(posts => this.posts = posts);
  }

  loadLikes(): void {
    this.likeService.getLikes().subscribe(likes => this.likes = likes);
  }

  loadComments(): void {
    this.commentService.getComments().subscribe(comments => this.comments = comments);
  }

  calculateEngagementScores(): void {
    this.engagementScores = this.users.map(user => {
      const postCount = this.posts.filter(post => post.userID === user.userID).length;
      const likeCount = this.likes.filter(like => like.userID === user.userID).length;
      const commentCount = this.comments.filter(comment => comment.userID === user.userID).length;
      const score = postCount + likeCount + commentCount;

      return { user, score };
    });
  }
}
