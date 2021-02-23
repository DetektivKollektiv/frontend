import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '@frontend/ui';
import { AuthService } from '@frontend/auth';
import { MockAuthService } from '@frontend/auth';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { ItemsState } from './store/items/items.state';
import { ItemsService } from './services/items/items.service';
import { MockItemsService } from '../test/mock/mock-items.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        UiModule.forRoot(),
        NgxsModule.forRoot([ItemsState]),
      ],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: ItemsService, useClass: MockItemsService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
