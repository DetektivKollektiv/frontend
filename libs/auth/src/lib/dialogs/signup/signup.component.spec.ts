import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { MatDialogRef } from '@angular/material/dialog';
import { UiModule } from '@frontend/ui';
import { AuthService } from '../../service/auth.service';
import { MockAuthService } from '../../../test/mock/mock-auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule.forRoot(), NoopAnimationsModule],
      declarations: [SignupComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
