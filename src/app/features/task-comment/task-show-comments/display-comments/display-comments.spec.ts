import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayComments } from './display-comments';

describe('DisplayComments', () => {
  let component: DisplayComments;
  let fixture: ComponentFixture<DisplayComments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayComments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayComments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
