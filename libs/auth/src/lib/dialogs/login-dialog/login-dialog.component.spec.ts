import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDialogComponent } from './login-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { UiModule } from '@frontend/ui';
import { AuthService } from '../../service/auth.service';
import { MockAuthService } from '../../../test/mock/mock-auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule.forRoot(), NoopAnimationsModule],
      declarations: [LoginDialogComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
