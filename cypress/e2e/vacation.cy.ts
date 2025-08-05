describe('Ajout de vacances via dialog', () => {
  beforeEach(() => {
    cy.visit('/vacance'); // ← ta route correcte
  });

  it('ouvre le dialog et remplit le formulaire', () => {
    // Étape 1 : Ouvre la boîte de dialogue
    cy.get('[data-cy=btn-open-dialog]').click();

    // Étape 2 : Remplit les champs
    const start = '2025-05-01';
    const end = '2025-07-05';

    cy.get('[data-cy=input-start]').type(start);
    cy.get('[data-cy=input-end]').type(end);

    // Étape 3 : Envoie
    cy.get('[data-cy=btn-submit]').click();

    // Étape 4 : Vérifie qu'il n'y a pas d'erreur
    cy.get('[data-cy=error-msg]').should('not.exist');
  });
});