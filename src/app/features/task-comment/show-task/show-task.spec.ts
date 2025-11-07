import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTask } from './show-task';

describe('ShowTask', () => {
  let component: ShowTask;
  let fixture: ComponentFixture<ShowTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
