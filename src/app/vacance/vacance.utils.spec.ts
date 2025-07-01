// import { validateVacation } from './vacance.utils';

// describe('validateVacation', () => {
//   it('retourne false si les dates sont invalides', () => {
//     const vacances = { start_day: 'bad-date', end_day: '2025-07-10', status: 'pending' };
//     expect(validateVacation(vacances)).toBeFalse();
//   });

//   it('retourne false si la date de début est après la fin', () => {
//     const vacances = { start_day: '2025-08-01', end_day: '2025-07-10', status: 'pending' };
//     expect(validateVacation(vacances)).toBeFalse();
//   });

//   it("retourne false si le statut est 'accepted'", () => {
//     const vacances = { start_day: '2025-07-01', end_day: '2025-07-10', status: 'accepted' };
//     expect(validateVacation(vacances)).toBeFalse();
//   });

//   it('retourne true si la demande est valide', () => {
//     const vacances = { start_day: '2025-07-01', end_day: '2025-07-10', status: 'pending' };
//     expect(validateVacation(vacances)).toBeTrue();
//   });
// });