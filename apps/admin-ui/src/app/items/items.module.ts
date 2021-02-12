import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './components/items.component';

import { UiModule } from '@frontend/ui';
import { DataModule } from '@frontend/data';

@NgModule({
  declarations: [ItemsComponent],
  imports: [CommonModule, ItemsRoutingModule, UiModule, DataModule],
})
export class ItemsModule {}
