class RegistrationPage {

    get signInButton() {
        return cy.get('button.header_signin');
    }

    get registrationButton() {
        return cy.contains('button', 'Registration');
    }

    get nameField() {
        return cy.get('input[name="name"]');
    }

    get lastNameField() {
        return cy.get('input[name="lastName"]');
    }

    get emailField() {
        return cy.get('input[name="email"]');
    }

    get passwordField() {
        return cy.get('input[name="password"]');
    }

    get repeatPasswordField() {
        return cy.get('input[name="repeatPassword"]');
    }

    get submitButton() {
        return cy.get('button[type="button"].btn.btn-primary');
    }


    clickSignInButton() {
        this.signInButton.click();
    }

    clickRegistrationButton() {
        this.registrationButton.click();
    }

    fillInRegistrationForm(name, lastName, email, password, repeatPassword) {
        this.nameField.type(name);
        this.lastNameField.type(lastName);
        this.emailField.type(email);
        this.passwordField.type(password);
        this.repeatPasswordField.type(repeatPassword);
    }

    submitRegistrationForm() {
        this.submitButton.click();
    }
}

export default RegistrationPage;