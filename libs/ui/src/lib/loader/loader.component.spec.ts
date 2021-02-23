import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DependenciesModule } from '../dependencies.module';

import { LoaderComponent } from './loader.component';
import { LoaderService } from './service/loader.service';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      imports: [DependenciesModule],
      providers: [LoaderService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
