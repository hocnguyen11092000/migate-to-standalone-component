import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';
import {
  FormArrayNgModelComponent,
  FormArrayReactiveFormComponent,
  FormTabComponent,
  FormTabItemComponent,
} from './components';

//#region ant
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
// import { CanDeactivateConfirmLeave } from 'src/guards/confirm-leave.guard';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
//#endregion ant

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'form-tab',
        component: FormTabComponent,
      },
      {
        path: 'form-array-ng-model',
        component: FormArrayNgModelComponent,
      },
      {
        path: 'form-array-reactive',
        component: FormArrayReactiveFormComponent,
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
  declarations: [
    FormTabComponent,
    FormTabItemComponent,
    FormArrayReactiveFormComponent,
  ],
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
    NzCollapseModule,
    //#endregion ant
    TranslateModule,
  ],
  exports: [RouterModule],
})
export class AdminModule {}
