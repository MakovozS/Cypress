describe("QAuto buttons tests", () => {
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });
    });

    describe("Headers buttons", () => {
        it("Logo is visible", () => {
            cy.get(".header_logo").should("be.visible");
        });

        it("Home link contains correct text", () => {
            cy.get("a[href='/']").should("have.text", "Home");

        });

        it("About button leads to the About section", () => {
            cy.get("button[appscrollto='aboutSection']").click();
            cy.get(".about-block").should("be.visible");
        });

        it("Sign In button redirects to the login form", () => {
            cy.get("button.header_signin").click();
            cy.get(".modal-content").should("be.visible");
            cy.get(".modal-title").should("contain.text", "Log in");
        });


        describe("Footers buttons", () => {

            it("Social media buttons ", () => {

                cy.get("a[href='https://www.facebook.com/Hillel.IT.School']").should("have.attr", "href", "https://www.facebook.com/Hillel.IT.School");
                cy.get("a[href='https://t.me/ithillel_kyiv']").should("have.attr", "href", "https://t.me/ithillel_kyiv");
                cy.get("a[href='https://www.youtube.com/user/HillelITSchool?sub_confirmation=1']").should("have.attr", "href", "https://www.youtube.com/user/HillelITSchool?sub_confirmation=1");
                cy.get("a[href='https://www.instagram.com/hillel_itschool/']").should("have.attr", "href", "https://www.instagram.com/hillel_itschool/");
                cy.get("a[href='https://www.linkedin.com/school/ithillel/']").should("have.attr", "href", "https://www.linkedin.com/school/ithillel/");
            });

            it("Ithillel link leads to ithillel.ua", () => {
                cy.get("a[href='https://ithillel.ua']").should("have.attr", "href", "https://ithillel.ua");
            });

            it("Footer contains correct text", () => {
                cy.get("footer p").should("contain.text", "© 2021 Hillel IT school");
            });


        });
    });
});
