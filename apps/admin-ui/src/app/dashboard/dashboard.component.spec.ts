import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiModule } from '@frontend/ui';
import { NgxsModule } from '@ngxs/store';
import { MockItemsService } from '../../test/mock/mock-items.service';
import { ItemsService } from '../services/items/items.service';
import { ItemsState } from '../store/items/items.state';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [UiModule.forRoot(), NgxsModule.forRoot([ItemsState])],
      providers: [{ provide: ItemsService, useClass: MockItemsService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
