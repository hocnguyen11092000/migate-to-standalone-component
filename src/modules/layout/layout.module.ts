import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FooterComponent,
  HeaderComponent,
  MenuComponent,
  MenuItemComponent,
} from './components';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';

//#region ant
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
//#endregion ant

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
    FormsModule,

    //#region ant
    NzLayoutModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzSelectModule,
    //#endregion ant
    TranslateModule,
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
