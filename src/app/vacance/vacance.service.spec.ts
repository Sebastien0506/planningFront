import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { VacanceComponent } from "./vacance.component";

describe('VacationComponent.validateVacation', () => {
  let component: VacanceComponent;
  let fixture: ComponentFixture<VacanceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({imports: [VacanceComponent]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  })
})
