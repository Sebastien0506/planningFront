describe('Connexion', () => {
    it('devrait réussir avec le token CSRF', () => {
      cy.request({
        method: 'GET',
        url: 'http://127.0.0.1:8000/csrf/',
      }).then((res) => {
        // Extraire le token CSRF
        const cookies = res.headers['set-cookie'];
        const csrfToken = cookies
          .find(c => c.startsWith('csrftoken='))
          .split(';')[0]
          .split('=')[1];
  
        // Définir le cookie manuellement dans Cypress
        cy.setCookie('csrftoken', csrfToken);
  
        // Attendre que le cookie soit bien enregistré (important !)
        cy.getCookie('csrftoken').then(() => {
          cy.request({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/login/',
            body: {
              email: 'tomholland@gmail.com',
              password: 'Password@1',
            },
            headers: {
              'X-CSRFToken': csrfToken,
            },
            withCredentials: true, // Important pour envoyer les cookies
          }).then((res) => {
            expect(res.status).to.eq(200);
          });
        });
      });
    });
  });