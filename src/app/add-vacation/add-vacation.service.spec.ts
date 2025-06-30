// import { provideHttpClient } from '@angular/common/http';
// import { TestBed } from '@angular/core/testing';
// import { AddVacationComponent } from './add-vacation.component';
// import { AddVacationService } from './add-vacation.service';

// describe('AddVacationComponent.validateInput', () => {
//   let component: AddVacationComponent;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         AddVacationService,
//         provideHttpClient()
//       ]
//     });

//     const service = TestBed.inject(AddVacationService);
//     component = new AddVacationComponent(service);
//   });

//   it('refuse un start_day invalide', () => {
//     const res = component.validateInput(new Date('invalid'), new Date());
//     expect(res).toBe('Le champ start_day doit être une date valide.');
//   });

//   it('refuse un start_day invalide', () => {
//     const res = component.validateInput(new Date('invalid'), new Date());
//     expect(res).toBe('Le champ start_day doit être une date valide.');
//   });

//   it('refuse un end_day invalide', () => {
//     const res = component.validateInput(new Date(), new Date('invalid'));
//     expect(res).toBe('Le champ end_day doit être une date valide.');
//   });

//   it('refuse si start_day > end_day', () => {
//     const start = new Date('2025-08-10');
//     const end = new Date('2025-08-05');
//     const res = component.validateInput(start, end);
//     expect(res).toBe('La date de début doit être antérieure à la date de fin.');
//   });

//   it('refuse une date de début dans le passé', () => {
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);

//     const end = new Date();
//     end.setDate(end.getDate() + 5);

//     const res = component.validateInput(yesterday, end);
//     expect(res).toBe('La date de début ne peut pas être dans le passé.');
//   });

//   it('accepte des dates valides', () => {
//     const start = new Date();
//     start.setDate(start.getDate() + 1);

//     const end = new Date();
//     end.setDate(end.getDate() + 5);

//     const res = component.validateInput(start, end);
//     expect(res).toBe('Données valides.');
//   });
// });
