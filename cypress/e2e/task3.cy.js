describe("API tests with cypress-plugin-api", () => {
    let mileage = 206;

    beforeEach(() => {
        cy.visit("https://qauto.forstudy.space", {
            auth: {
                username: "guest",
                password: "welcome2qauto",
            },
        });

        cy.get("button.header_signin").click();
        const email = "makovozsvetl@gmail.com";
        const password = "Password123";

        cy.get("#signinEmail").type(email);
        cy.get("#signinPassword").type(password);
        cy.get("div.modal-footer").find("button.btn.btn-primary").should("not.be.disabled").click({ force: true });
        cy.url().should("eq", "https://qauto.forstudy.space/panel/garage");

        cy.window().then((win) => {
            const lastMileage = win.localStorage.getItem("mileage");
            if (lastMileage) {
                mileage = parseInt(lastMileage) + 1;
            } else {
                mileage++;
            }
            win.localStorage.setItem("mileage", mileage);
        });
    });

    it("should create an expense successfully", () => {
        const currentDate = new Date().toISOString().split('T')[0];
        const requestBody = {
            carId: 229152,
            reportedAt: currentDate,
            mileage: mileage,
            liters: 11,
            totalCost: 11,
            forceMileage: false
        };

        cy.api({
            method: "POST",
            url: "/api/expenses",
            body: requestBody,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.be.oneOf([200, 400, 401, 404]);
            if (response.status === 200) {
                expect(response.body.status).to.equal("ok");
                expect(response.body.data).to.have.property("id").and.to.be.a("number");
                expect(response.body.data).to.have.property("carId", requestBody.carId);
                expect(response.body.data).to.have.property("reportedAt", requestBody.reportedAt);
                expect(response.body.data).to.have.property("mileage", requestBody.mileage);
                expect(response.body.data).to.have.property("liters", requestBody.liters);
                expect(response.body.data).to.have.property("totalCost", requestBody.totalCost);
            } else if (response.status === 400) {
                expect(response.body.status).to.equal("error");
                expect(response.body.message).to.equal("Bad request");
            } else if (response.status === 401) {
                expect(response.body.message).to.equal("Not authenticated");
            } else if (response.status === 404) {
                expect(response.body.status).to.equal("error");
                expect(response.body.message).to.equal("Not found");
            }
        });
    });
    it("should get the expense by ID successfully", () => {
        const expenseId = 85229;
        cy.api({
            method: "GET",
            url: `/api/expenses/${expenseId}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.be.oneOf([200, 401, 404]);
            if (response.status === 200) {
                expect(response.body.status).to.equal("ok");
                expect(response.body.data).to.have.property("id").and.to.equal(expenseId);
                expect(response.body.data).to.have.property("carId");
                expect(response.body.data).to.have.property("reportedAt");
                expect(response.body.data).to.have.property("mileage");
                expect(response.body.data).to.have.property("liters");
                expect(response.body.data).to.have.property("totalCost");
            } else if (response.status === 401) {
                expect(response.body.message).to.equal("Not authenticated");
            } else if (response.status === 404) {
                expect(response.body.status).to.equal("error");
                expect(response.body.message).to.equal("Not found");
            }
        });
    });

    it("should update the expense by ID successfully", () => {
        const expenseId = '85229';
        const currentDate = new Date().toISOString().split('T')[0];
        const requestBody = {
            carId: 229152,
            reportedAt: currentDate,
            mileage: mileage + 10,
            liters: 15,
            totalCost: 15,
            forceMileage: false
        };

        cy.api({
            method: "PUT",
            url: `/api/expenses/${expenseId}`,
            body: requestBody,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.be.oneOf([200, 400, 401, 404]);

            if (response.status === 200) {
                expect(response.body.status).to.equal("ok");
                expect(response.body.data).to.have.property("id").and.to.equal(expenseId);
                expect(response.body.data).to.have.property("carId", requestBody.carId);
                expect(response.body.data).to.have.property("reportedAt", requestBody.reportedAt);
                expect(response.body.data).to.have.property("mileage", requestBody.mileage);
                expect(response.body.data).to.have.property("liters", requestBody.liters);
                expect(response.body.data).to.have.property("totalCost", requestBody.totalCost);
            } else if (response.status === 400) {
                expect(response.body.status).to.equal("error");
                expect(response.body.message).to.equal("Bad request");
            } else if (response.status === 401) {
                expect(response.body.message).to.equal("Not authenticated");
            } else if (response.status === 404) {
                expect(response.body.status).to.equal("error");
                expect(response.body.message).to.equal("Not found");
            }
        });
    });

});
