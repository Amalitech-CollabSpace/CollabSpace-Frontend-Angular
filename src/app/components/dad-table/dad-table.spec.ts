import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadTable } from './dad-table';

describe('DadTable', () => {
  let component: DadTable;
  let fixture: ComponentFixture<DadTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
