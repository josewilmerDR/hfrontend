import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePromotionsComponent } from './home-promotions.component';

describe('HomePromotionsComponent', () => {
  let component: HomePromotionsComponent;
  let fixture: ComponentFixture<HomePromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePromotionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
