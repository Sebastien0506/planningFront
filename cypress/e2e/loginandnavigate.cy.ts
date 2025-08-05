describe('Connexion sécurisée avec CSRF + JWT', () => {
    it('Récupère le CSRF token et se connecte', () => {
      const email = 'tomhallond@gmail.com';
      const password = 'Password@1';
  
      cy.visit('/connexion');
  
      // Étape 1 : Récupère le CSRF
      cy.request({
        method: 'GET',
        url: 'http://127.0.0.1:8000/csrf/',
        withCredentials: true,
      }).then((res) => {
        const cookies = res.headers['set-cookie'];
  
        expect(cookies).to.exist;
        expect(Array.isArray(cookies)).to.be.true;
  
        const csrfCookie = cookies.find((cookie) =>
          cookie.startsWith('csrftoken=')
        );
  
        expect(csrfCookie).to.exist;
  
        const csrfToken = csrfCookie.split(';')[0].split('=')[1];
        Cypress.env('csrfToken', csrfToken);
        cy.log('CSRF token:', csrfToken);
  
        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/api/login/',
            body: {
              email: 'tomhallond@gmail.com',
              password: 'Password@1',
            },
            headers: {
              'X-CSRFToken': Cypress.env('csrfToken'),
              'Content-Type': 'application/json',
            },
            withCredentials: true, // indispensable
            failOnStatusCode: false, // pour voir l’erreur s’il y en a
          }).then((res) => {
            cy.log('Status:', res.status);
            cy.log('Body:', JSON.stringify(res.body));
          });
      });
    });
  });