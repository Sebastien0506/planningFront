import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEmployerComponent } from './detail-employer.component';

describe('DetailEmployerComponent', () => {
  let component: DetailEmployerComponent;
  let fixture: ComponentFixture<DetailEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailEmployerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
