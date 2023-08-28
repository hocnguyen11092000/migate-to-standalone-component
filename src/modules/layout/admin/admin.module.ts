import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
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
import { NzIconModule } from 'ng-zorro-antd/icon';
//#endregion ant

//#region guard
import { CanDeactivateConfirmLeave } from 'src/guards/confirm-leave.guard';
import { NgModelForm } from './components/form-array-ng-model/services/ng-model-form.service';
import { NgFormLength } from './components/form-array-ng-model/services/ng-form-length.service';
import { HeaderComponent, MyLibModule, TrimDirective } from 'ng-core';
import { FormTabCustomAddDeleteComponent } from './components/form-tab-custom-add-delete/form-tab-custom-add-delete.component';
import { TestComponent } from './components/form-tab-custom-add-delete/components/test/test.component';
import { ProxyComponent } from './components/proxy/proxy.component';
import { candeActiveFunc } from 'src/guards/candeactive-func.guard';
import { CustomControlValueAssesorComponent } from './components/custom-control-value-assesor/custom-control-value-assesor.component';
//#endregion guard

import { IconDefinition } from '@ant-design/icons-angular';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'form-tab',
        component: FormTabComponent,
        canDeactivate: [CanDeactivateConfirmLeave, candeActiveFunc],
      },
      {
        path: 'form-tab/:id',
        component: FormTabComponent,
        canDeactivate: [CanDeactivateConfirmLeave],
      },
      {
        path: 'form-array-ng-model',
        component: FormArrayNgModelComponent,
        canDeactivate: [candeActiveFunc],
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
        path: 'reactive-form-custom-add',
        component: FormTabCustomAddDeleteComponent,
      },
      {
        path: 'proxy',
        component: ProxyComponent,
      },
      {
        path: 'custom-control',
        component: CustomControlValueAssesorComponent,
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

import { StarOutline, StarFill } from '@ant-design/icons-angular/icons';
import { CustomRate } from './components/custom-control-value-assesor/components/custom-rate/custom-rate.component';

const icons: IconDefinition[] = [StarOutline, StarFill];

@NgModule({
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
    NzIconModule.forRoot(icons),

    //#endregion ant
    TranslateModule,
    FormTabComponent,
    FormTabItemComponent,
    FormArrayReactiveFormComponent,
    FormArrayNgModelItemComponent,
    FormArrayNgModelComponent,
    ReactiveFormCustomValidatorComponent,

    //#region core
    // HeaderComponent,
    // TrimDirective,
    MyLibModule,
    //#endregion core
  ],
  exports: [RouterModule],
  providers: [
    CanDeactivateConfirmLeave,
    // {
    //   provide: NgModelForm,
    //   useFactory: () => {
    //     // OK: a class factory
    //     const engine = inject(NgFormLength);
    //     return new NgModelForm(engine);
    //   },
    // },
  ],
  declarations: [
    FormTabCustomAddDeleteComponent,
    TestComponent,
    ProxyComponent,
    CustomControlValueAssesorComponent,
    CustomRate,
  ],
})
export class AdminModule {}
