describe("Registration Form Tests", () => {
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });
        cy.get("button.hero-descriptor_btn.btn.btn-primary").click();
    });

    describe("Name Field Validations", () => {
        it("Error for empty field", () => {
            cy.get("#signupName").clear().blur();
            cy.contains("Name required").should("be.visible");
        });


        it("Should accept valid input", () => {
            cy.get("#signupName").clear().type("Svit Lana").blur();
            cy.contains("Name is invalid").should("be.visible");
        });


        it("Error wrong length", () => {
            cy.get("#signupName").type("S").blur();
            cy.contains("Name has to be from 2 to 20 characters long").should("be.visible");

            cy.get("#signupName").clear().type("S".repeat(21)).blur();
            cy.contains("Name has to be from 2 to 20 characters long").should("be.visible");
        });


        it("Should show valid border color for invalid Name input", () => {
            cy.get("#signupName").clear().type("Svit Lana").blur();
            cy.get("#signupName").should("have.css", "border-color", "rgb(220, 53, 69)");
        });

    });

    describe("Last Name Field Validations", () => {
        it("Error for empty field", () => {
            cy.get("#signupLastName").clear().blur();
            cy.contains("Last name required").should("be.visible");
        });

        it("Should accept valid input", () => {
            cy.get("#signupLastName").clear().type("Last Name").blur();
            cy.contains("Last name is invalid").should("be.visible");
        });

        it("Error wrong length", () => {
            cy.get("#signupLastName").type("S").blur();
            cy.contains("Last name has to be from 2 to 20 characters long").should("be.visible");

            cy.get("#signupLastName").clear().type("S".repeat(21)).blur();
            cy.contains("Last name has to be from 2 to 20 characters long").should("be.visible");
        });

        it("Should show valid border color for invalid  Last Name input", () => {
            cy.get("#signupLastName").clear().type("Svit Lana").blur();
            cy.get("#signupLastName").should("have.css", "border-color", "rgb(220, 53, 69)");
        });
    });

    describe("Email Field Validations", () => {
        it("Should show error for empty field", () => {
            cy.get("#signupEmail").clear().blur();
            cy.contains("Email required").should("be.visible");
        });

        it("Should show error for invalid email", () => {
            cy.get("#signupEmail").type("invalid-email").blur();
            cy.contains("Email is incorrect").should("be.visible");
        });

        it("Should accept valid email", () => {
            cy.get("#signupEmail").clear().type("user@test.com").blur();
            cy.contains("Email is incorrect").should("not.exist");
        });

        it("Should show valid border color for invalid  Email input", () => {
            cy.get("#signupEmail").clear().type("invalid-email").blur();
            cy.get("#signupEmail").should("have.css", "border-color", "rgb(220, 53, 69)");
        });
    });

    describe("Password Field Validations", () => {
        it("Error for empty field", () => {
            cy.get("#signupPassword").clear().blur();
            cy.contains("Password required").should("be.visible");
        });

        it("Error for wrong password", () => {
            cy.get("#signupPassword").type("Long".repeat(4)).blur();
            cy.contains("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter").should("be.visible");
        });

        it("Should accept strong password", () => {
            cy.get("#signupPassword").clear().type("Password123").blur();
            cy.contains("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter").should("not.exist");
        });

        it("Error for password without integer, capital letter", () => {
            cy.get("#signupPassword").clear().type("password").blur();
            cy.contains("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter").should("be.visible");
        });

        it("Should show valid border color for invalid  Password input", () => {
            cy.get("#signupPassword").clear().type("password").blur();
            cy.get("#signupPassword").should("have.css", "border-color", "rgb(220, 53, 69)");
        });

    });

    describe("Re-enter Password Field Validations", () => {
        it("Error for mismatched passwords", () => {
            cy.get("#signupPassword").type("Password1");
            cy.get("#signupRepeatPassword").type("Password123").blur();
            cy.contains("Passwords do not match").should("be.visible");
        });

        it("Error for empty field", () => {
            cy.get("#signupRepeatPassword").clear().blur();
            cy.contains("Re-enter password required").should("be.visible");
        });

        it("Should show valid border color for invalid  Re-enter password input", () => {
            cy.get("#signupRepeatPassword").clear().type("password").blur();
            cy.get("#signupRepeatPassword").should("have.css", "border-color", "rgb(220, 53, 69)");
        });

        it("Should accept matching passwords", () => {
            cy.get("#signupPassword").type("Password123");
            cy.get("#signupRepeatPassword").type("Password123").blur();
            cy.contains("Passwords do not match").should("not.exist");
        });
    });

    describe("Register Button Validation", () => {
        it("Should be disabled if fields are invalid", () => {
            cy.get("button.btn.btn-primary").should("be.disabled");
        });

        it("Should be disabled if any field is invalid", () => {
            cy.get("#signupName").type("Name");
            cy.get("#signupLastName").type("Last");
            cy.get("#signupEmail").type("invalid-email");
            cy.get("#signupPassword").type("Password123");
            cy.get("#signupRepeatPassword").type("Password123");
            cy.get("button.btn.btn-primary").should("be.disabled");
        });

        it("Should be enabled if all fields are valid", () => {
            cy.get("#signupName").type("John");
            cy.get("#signupLastName").type("Doe");
            cy.get("#signupEmail").type("makovozsvetl+1@gmail.com");
            cy.get("#signupPassword").type("Password123");
            cy.get("#signupRepeatPassword").type("Password123");
            cy.get("button.btn.btn-primary").should("not.be.disabled");
        });

        it("Creating user after clicking ", () => {
            cy.get("#signupName").type("John");
            cy.get("#signupLastName").type("Doe");
            cy.get("#signupEmail").type("makovozsvetl+4@gmail.com");
            cy.get("#signupPassword").type("Password123");
            cy.get("#signupRepeatPassword").type("Password123");
            cy.get("button.btn.btn-primary").should("not.be.disabled");
            cy.contains("button.btn.btn-primary", "Register").click();
            cy.url().should("eq", "https://qauto.forstudy.space/panel/garage");
        });

    });

});

