import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';
import {
  FormArrayNgModelComponent,
  FormArrayNgModelItemComponent,
  FormArrayReactiveFormComponent,
  FormTabComponent,
  FormTabItemComponent,
  ReactiveFormCustomValidatorComponent,
} from './components';

//#region ant
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
//#endregion ant

//#region guard
import { CanDeactivateConfirmLeave } from 'src/guards/confirm-leave.guard';
//#endregion guard

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
        path: 'form-array-reactive',
        component: FormArrayReactiveFormComponent,
      },
      {
        path: 'reactive-form-custom-validator',
        component: ReactiveFormCustomValidatorComponent,
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
    FormArrayNgModelItemComponent,
    FormArrayNgModelComponent,
    ReactiveFormCustomValidatorComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
  providers: [CanDeactivateConfirmLeave],
})
export class AdminModule {}
