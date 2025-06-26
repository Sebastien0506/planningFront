import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyContratComponent } from './modify-contrat.component';

describe('ModifyContratComponent', () => {
  let component: ModifyContratComponent;
  let fixture: ComponentFixture<ModifyContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyContratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
