class AddCarPage {
    openAddCarModal() {
        cy.get("button.btn.btn-primary").contains("Add car").click();
    }

    selectCarBrand(brand) {
        cy.get("select#addCarBrand").select(brand);
    }

    selectCarModel(model) {
        cy.get("select#addCarModel").select(model);
    }

    fillMileage(mileage) {
        cy.get("input#addCarMileage").clear().type(mileage);
    }

    submitCar() {
        cy.get("button.btn.btn-primary")
            .contains("Add")
            .should("not.be.disabled") // Убедимся, что кнопка активна
            .click({ force: true }); // Принудительный клик, если элемент перекрыт
    }
}

export default AddCarPage;