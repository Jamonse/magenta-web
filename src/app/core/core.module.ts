import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { NavOptionsComponent } from './nav-options/nav-options.component';
import { NewsfeedPostComponent } from './newsfeed/newsfeed-post/newsfeed-post.component';
import { NewsfeedEffect } from './newsfeed/state/newsfeed.effect';
import { NewsfeedReducer } from './newsfeed/state/newsfeed.reducer';
import { NEWSFEED_STATE_NAME } from './newsfeed/state/newsfeed.selector';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    NavOptionsComponent,
    NewsfeedPostComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule,
    RouterModule,
    EffectsModule.forFeature([NewsfeedEffect]),
    StoreModule.forFeature(NEWSFEED_STATE_NAME, NewsfeedReducer),
  ],
})
export class CoreModule {}
