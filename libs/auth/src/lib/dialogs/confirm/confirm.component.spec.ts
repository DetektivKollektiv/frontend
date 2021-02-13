import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmComponent } from './confirm.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UiModule } from '@frontend/ui';
import { AuthService } from '../../service/auth.service';
import { MockAuthService } from '../../../test/mock/mock-auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule.forRoot(), NoopAnimationsModule],
      declarations: [ConfirmComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
