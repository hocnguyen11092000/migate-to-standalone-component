import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';
import {
  FormArrayNgModelComponent,
  FormTabComponent,
  FormTabItemComponent,
} from './components';

//#region ant
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CanDeactivateConfirmLeave } from 'src/guards/confirm-leave.guard';
//#endregion ant

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'form-tab',
        component: FormTabComponent,
        canDeactivate: [CanDeactivateConfirmLeave],
      },
      {
        path: 'form-array-ng-model',
        component: FormArrayNgModelComponent,
      },
      {
        path: '',
        redirectTo: 'form-tab',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [FormTabComponent, FormTabItemComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    //#region ant
    NzTabsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzDropDownModule,
    //#endregion ant
    TranslateModule,
  ],
  exports: [RouterModule],
  providers: [CanDeactivateConfirmLeave],
})
export class AdminModule {}
