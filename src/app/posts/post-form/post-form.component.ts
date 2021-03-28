import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../model/post.model';
import { PostsFacade } from '../state/posts.facade';

@Component({
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit, OnDestroy {
  post!: Post;
  postSubscription!: Subscription;
  postForm: FormGroup;
  isUpdate: boolean = false;
  actionButtonLabel: string = 'Post';
  postFormTitle: string = 'Create new post';

  constructor(
    private formBuilder: FormBuilder,
    private postsFacade: PostsFacade
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.min(2)]],
      content: [''],
    });
  }

  onFormSubmit(): void {
    if (!this.postForm.valid) {
      return;
    }
    if (this.post) {
      const post = {
        ...this.post,
        ...this.postForm.value,
      };
      this.postsFacade.updatePost(post);
    } else {
      this.postsFacade.createPost(this.postForm.value);
    }
  }

  onBack(): void {
    this.postsFacade.navigateToBackPage();
  }

  ngOnInit(): void {
    this.isUpdate = this.postsFacade.isFormUpdateMode();
    if (this.isUpdate) {
      this.actionButtonLabel = 'Update';
      this.postSubscription = this.postsFacade
        .getPostById()
        .subscribe((post) => {
          if (post) {
            this.post = post;
            this.postFormTitle = `Update ${post.title}`;
            this.postForm.patchValue({
              title: post.title,
              content: post.content,
            });
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '0',
    maxHeight: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter post content here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
}
