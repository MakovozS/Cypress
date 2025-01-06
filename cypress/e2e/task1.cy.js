describe('API Tests for Cars', () => {
    let carId;

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

    it('GET: Should fetch list of car brands', () => {
        cy.request('GET', 'https://qauto.forstudy.space/api/cars/brands').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.be.an('array');
        });
    });

    it('GET: Should fetch list of car models', () => {
        cy.request('GET', 'https://qauto.forstudy.space/api/cars/models').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.be.an('array');
        });
    });

    it('POST: Should add a new car', () => {
        const newCar = {
            carBrandId: 3,
            carModelId: 11,
            mileage: 1010
        };

        cy.request({
            method: 'POST',
            url: 'https://qauto.forstudy.space/api/cars',
            body: newCar,
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false
        }).then((response) => {
            expect([200, 201]).to.include(response.status, `Expected status 200 or 201, but got ${response.status}`);
            expect(response.body.data).to.have.property('id');
            expect(response.body.data.carBrandId).to.eq(newCar.carBrandId, 'Brand ID does not match');
            expect(response.body.data.carModelId).to.eq(newCar.carModelId, 'Model ID does not match');
            expect(response.body.data.mileage).to.eq(newCar.mileage, 'Mileage does not match');

            carId = response.body.data.id;
        });
    });


    it('PUT: Should update car information', () => {
        const updatedCar = {
            carBrandId: 3,
            carModelId: 11,
            mileage: 101010
        };

        cy.request({
            method: 'PUT',
            url: `https://qauto.forstudy.space/api/cars/${carId}`,
            body: updatedCar,
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false
        }).then((response) => {

            expect([200, 201]).to.include(response.status, `Expected status 200 or 201, but got ${response.status}`);
            expect(response.body.data).to.have.property('id');
            expect(response.body.data.mileage).to.eq(updatedCar.mileage, 'Mileage does not match after update');
        });
    });

    it('DELETE: Should delete the car', () => {
        expect(carId).to.not.be.undefined;

        cy.request({
            method: 'DELETE',
            url: `https://qauto.forstudy.space/api/cars/${carId}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.have.property('carId', carId);
        });
    });
});
