import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';

import { DataModule } from '@frontend/data';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/service/loader.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DependenciesModule } from './dependencies.module';

@NgModule({
  imports: [CommonModule, DataModule, DependenciesModule],
  declarations: [
    TableToolbarComponent,
    LoaderComponent,
    ConfirmDialogComponent,
  ],
  exports: [DependenciesModule, TableToolbarComponent],
})
export class UiModule {
  static forRoot(): ModuleWithProviders<UiModule> {
    return {
      ngModule: UiModule,
      providers: [LoaderService],
    };
  }
}
