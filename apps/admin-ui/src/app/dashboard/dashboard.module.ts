import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UiModule } from '@frontend/ui';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, UiModule, NgxChartsModule],
})
export class DashboardModule {}
