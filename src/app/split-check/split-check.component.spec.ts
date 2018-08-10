import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitCheckComponent } from './split-check.component';

describe('SplitCheckComponent', () => {
  let component: SplitCheckComponent;
  let fixture: ComponentFixture<SplitCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
