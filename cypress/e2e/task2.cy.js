beforeEach(() => {
    cy.visit('https://qauto.forstudy.space', {
        auth: {
            username: 'guest',
            password: 'welcome2qauto',
        },
    });

    cy.get('button.header_signin').click();
    const email = 'makovozsvetl@gmail.com';
    const password = 'Password123';

    cy.get('#signinEmail').type(email);
    cy.get('#signinPassword').type(password);

    cy.get('div.modal-footer')
        .find('button.btn.btn-primary')
        .should('not.be.disabled')
        .click({ force: true });

    cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');
});

it('should change user name to Polar Bear', () => {

    cy.intercept('GET', '/api/users/profile', (req) => {
        req.reply((res) => {
            res.body.name = 'Polar Bear';
            res.send();
        });
    }).as('getProfile');

    cy.get('a[routerlink="profile"]').click();

    cy.wait('@getProfile');

    cy.get('p.profile_name.display-4').should('have.text', 'Test Testovich');

    cy.get('p.profile_name.display-4')
        .invoke('text', 'Polar Bear')
        .should('have.text', 'Polar Bear');
});
