import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import {
  FooterComponent,
  HeaderComponent,
  MenuComponent,
  MenuItemComponent,
} from './components';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    LayoutComponent,
    MenuComponent,
    MenuItemComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NzLayoutModule,
    NzBreadCrumbModule,
  ],
  exports: [
    LayoutComponent,
    MenuComponent,
    MenuItemComponent,
    FooterComponent,
    HeaderComponent,
    RouterModule,
  ],
})
export class LayoutModule {}
