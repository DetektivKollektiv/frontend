import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UiModule } from '@frontend/ui';
import { NgxsModule } from '@ngxs/store';
import { MockItemsService } from '../../../test/mock/mock-items.service';
import { ItemsService } from '../../services/items/items.service';
import { ItemsState } from '../../store/items/items.state';

import { ItemsComponent } from './items.component';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemsComponent],
      imports: [
        UiModule.forRoot(),
        NgxsModule.forRoot([ItemsState]),
        NoopAnimationsModule,
      ],
      providers: [{ provide: ItemsService, useClass: MockItemsService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
