
class AddExpensePage {

    clickFuelExpensesButton() {
        cy.get('a[routerlink="expenses"]').click();
    }

    clickAddExpenseButton() {
        cy.get('button.btn.btn-primary').contains('Add an expense').click();
    }

    fillLiters(liters) {
        cy.get('input#addExpenseLiters').type(liters);
    }

    fillTotalCost(cost) {
        cy.get('input#addExpenseTotalCost').type(cost);
    }

    submitExpense() {
        cy.get('button.btn.btn-primary').contains('Add').click();
    }
}

export default AddExpensePage;
