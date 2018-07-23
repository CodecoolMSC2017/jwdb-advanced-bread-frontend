import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDeatilsComponent } from './restaurant-deatils.component';

describe('RestaurantDeatilsComponent', () => {
  let component: RestaurantDeatilsComponent;
  let fixture: ComponentFixture<RestaurantDeatilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantDeatilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
