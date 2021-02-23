import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableToolbarComponent } from './table-toolbar.component';

import { DependenciesModule } from '../dependencies.module';

describe('TableToolbarComponent', () => {
  let component: TableToolbarComponent;
  let fixture: ComponentFixture<TableToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableToolbarComponent],
      imports: [DependenciesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
