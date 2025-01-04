import AddCarPage from '../pages/AddCarPage';
import RegistrationPage from '../pages/RegistrationPage';
import AddExpensePage from '../pages/AddExpensePage';

describe('QAuto2 Add Car and Add Expense Test', () => {
    const addCarPage = new AddCarPage();
    const registrationPage = new RegistrationPage();
    const addExpensePage = new AddExpensePage();

    beforeEach(() => {
        cy.visit('https://qauto2.forstudy.space', {
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

        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
        const email = `makovozsvetl+${randomNumber}@gmail.com`;

        registrationPage.fillInRegistrationForm(name, lastName, email, password, repeatPassword);
        registrationPage.submitRegistrationForm();

        addCarPage.openAddCarModal();
        addCarPage.selectCarBrand('Audi');
        addCarPage.selectCarModel('TT');

        const carMileage = Math.floor(Math.random() * 10) + 1;
        cy.get('#addCarMileage')
            .clear()
            .type(carMileage, { force: true });

        cy.get('div.modal-footer')
            .find('button.btn.btn-primary')
            .should('not.be.disabled')
            .click({ force: true });

        cy.get('ngb-modal-window').should('not.exist', { timeout: 6000 });

        cy.url().should('eq', 'https://qauto2.forstudy.space/panel/garage');

        cy.get('a[routerlink="expenses"]')
            .click({ force: true });

        addExpensePage.clickAddExpenseButton();

        const liters = Math.floor(Math.random() * (20 - 11 + 1)) + 11;
        const totalCost = Math.floor(Math.random() * 100) + 10;

        addExpensePage.fillLiters(liters);
        addExpensePage.fillTotalCost(totalCost);


        const expenseMileage = Math.floor(Math.random() * (20 - 11 + 1)) + 11;
        cy.get('#addExpenseMileage')
            .clear()
            .type(expenseMileage, { force: true });

        cy.get('div.modal-footer')
            .find('button.btn.btn-primary')
            .should('not.be.disabled')
            .click({ force: true });

        cy.get('ngb-modal-window').should('not.exist', { timeout: 6000 });


        cy.url().should('eq', 'https://qauto2.forstudy.space/panel/expenses');

        const currentDate = new Date().toLocaleDateString('uk-UA');
        cy.contains('td.font-weight-bold', currentDate).should('exist');
    });
});
