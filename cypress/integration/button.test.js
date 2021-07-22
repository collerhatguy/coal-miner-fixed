
describe("button test", () => {
    beforeEach(() => {
        cy.visit("localhost:3000")
    })
    it("visibility button", () => {
        const visibilityPnls = cy.get("[data-cy='visibility-pnl']") 
        const visibilityBtns = cy.get("[data-cy='visibility-btn']");
        visibilityPnls.each(pnl => {
            cy.wrap(pnl).should("exist")
        })
        visibilityBtns.each(btn => {
            cy.wrap(btn)
                .should("have.text","Hide?")
                .click()
                .should("have.text","Show?")
        })
        cy.get("[data-cy='visibility-pnl']").should("not.exist")
    })
})