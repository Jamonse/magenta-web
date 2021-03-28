import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  @Output() editEvent: EventEmitter<number> = new EventEmitter();
  @Output() readEvent: EventEmitter<number> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  editClick(): void {
    this.editEvent.emit(this.post.id);
  }

  readClick(): void {
    this.readEvent.emit(this.post.id);
  }

  deleteClick(): void {
    this.deleteEvent.emit(this.post.id);
  }
}
