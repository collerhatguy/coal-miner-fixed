
describe("Test for proper startup", () => {
    beforeEach(() => {
        cy.visit("localhost:3000")
    })
    it("check starter money", () => {
        const starterMoney = cy.get("[data-cy='money']")
        starterMoney
            .should("exist")
            .invoke("text")
            .then(text => expect(text).equal("10"))
    })
    it("check starter multiplier", () => {
        const multipliers = cy.get("[data-cy='multiplier']");
        multipliers.each(m => {
            cy.wrap(m).should("not.be.checked");
        })
    })
    it("check start progress", () => {
        const progressBars = cy.get("[data-cy='progress']")
        progressBars.each(p =>{
            cy.wrap(p)
                .should("have.value", 0)
                // .should("have.max", 100) 
        })
    })
    it("first worker is affordable", () => {
        // const firstOwned = cy.get('[data-cy="owned"]');
        // const firstPurchaseBtn = cy.get("[data-cy='buy']");

        // firstOwned.each(owned => {
        //     cy.wrap(owned).should("have.text", "0");
        // })
        // firstPurchaseBtn
        //     .should("exist")
        //     .click()
        // firstOwned.should("have.text", "1")
    })
})