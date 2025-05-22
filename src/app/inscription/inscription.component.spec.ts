import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionComponent } from './inscription.component';


describe('InscriptionComponent', () => {
  let component: InscriptionComponent;
  let fixture: ComponentFixture<InscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return success for valid inputs', () => {
    const result = component.validInscription('John', 'Doe', 'johndoes@gmail.com', 'Password@1');
    expect(result).toBe('✅ Inscription valide.');
  });
  
  it('should return error for invalid inputs', () => {
    const result = component.validInscription('John', 'Doe', 'johndoes@gmail.com', 'Password');
    expect(result).toBe("❌ Mot de passe invalide : il doit contenir au moins une majuscule, un chiffre et un caractère spécial (#, $, %, @).");
  });
});
