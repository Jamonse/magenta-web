import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { NavOptionsComponent } from './nav-options/nav-options.component';

@NgModule({
  declarations: [HomeComponent, LayoutComponent, NavOptionsComponent],
  imports: [SharedModule, CoreRoutingModule, RouterModule],
})
export class CoreModule {}
