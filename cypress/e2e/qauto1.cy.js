// cypress/e2e/qauto1.cy.js

import AddCarPage from '../pages/AddCarPage';
import RegistrationPage from '../pages/RegistrationPage';
import AddExpensePage from '../pages/AddExpensePage';

describe('Add Car and Add Expense Test', () => {
    const addCarPage = new AddCarPage();
    const registrationPage = new RegistrationPage();
    const addExpensePage = new AddExpensePage();

    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });
    });

    it('should successfully add a new car and add an expense', () => {
        registrationPage.clickSignInButton();
        registrationPage.clickRegistrationButton();

        const name = 'Test';
        const lastName = 'Testovich';
        const password = 'Password123';
        const repeatPassword = 'Password123';

        const randomNumber = Math.floor(Math.random() * 900) + 100;
        const email = `makovozsvetl+${randomNumber}@gmail.com`;

        registrationPage.fillInRegistrationForm(name, lastName, email, password, repeatPassword);
        registrationPage.submitRegistrationForm();

        addCarPage.openAddCarModal();
        addCarPage.selectCarBrand('Audi');
        addCarPage.selectCarModel('TT');

        const mileage = Math.floor(Math.random() * 10) + 1;
        cy.get('#addCarMileage')
            .clear()
            .type(mileage, { force: true });

        cy.get('div.modal-footer')
            .find('button.btn.btn-primary')
            .should('not.be.disabled')
            .click({ force: true });

        cy.get('ngb-modal-window').should('not.exist', { timeout: 6000 });

        cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');

        cy.get('a[routerlink="expenses"]')
            .click({ force: true });

        addExpensePage.clickAddExpenseButton();

        const expenseMileage = Math.floor(Math.random() * (20 - 11 + 1)) + 11;
        cy.get('#addExpenseMileage')
            .clear()
            .type(expenseMileage, { force: true });

        const liters = Math.floor(Math.random() * (20 - 11 + 1)) + 11;
        cy.get('#addExpenseLiters')
            .clear()
            .type(liters, { force: true });


        const totalCost = Math.floor(Math.random() * 100) + 10;
        cy.get('#addExpenseTotalCost')
            .clear()
            .type(totalCost, { force: true });

        cy.get('div.modal-footer')
            .find('button.btn.btn-primary')
            .should('not.be.disabled')
            .click({ force: true });

        cy.get('ngb-modal-window').should('not.exist', { timeout: 6000 });

        cy.url().should('eq', 'https://qauto.forstudy.space/panel/expenses');

        const currentDate = new Date().toLocaleDateString('uk-UA');
        cy.contains('td.font-weight-bold', currentDate).should('exist');
    });
});
