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
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnInit {
  users: User[] = [];
  posts: Post[] = [];
  likes: Like[] = [];
  comments: Comment[] = [];
  selectedUser: User | null = null;
  userFeed: { post: Post, likes: number, comments: number }[] = [];

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

  selectUser(user: User): void {
    this.selectedUser = user;
    this.updateUserFeed();
  }

  updateUserFeed(): void {
    if (this.selectedUser) {
      this.userFeed = this.posts
        .filter(post => post.userID === this.selectedUser!.userID)
        .map(post => {
          const likeCount = this.likes.filter(like => like.postID === post.postID).length;
          const commentCount = this.comments.filter(comment => comment.postID === post.postID).length;
          return { post, likes: likeCount, comments: commentCount };
        });
    }
  }
}
