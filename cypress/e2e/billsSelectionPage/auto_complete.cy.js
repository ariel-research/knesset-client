/// <reference types="cypress" />

const INPUT_PREFIXES = [
  "dvd",
  "התנתקות",
  "ממשלה",
  "מדינה",
  "משפט",
  "חוק",
  "מס",
];

const MAX_DROPDOWN_SIZE = 30;

describe("autocomplete", () => {
  before(() => {
    cy.visit("http://localhost:3000/");
  });

  beforeEach(() => {
    cy.get("#autocomplete-input").clear();
  });

  it("Autocomplete functionality", () => {
    cy.get("#autocomplete-input").as("BillsInput").should("be.empty");
    cy.wait(3000); //wait for results to load up
    for (const prefix of INPUT_PREFIXES) {
      cy.get("@BillsInput").type(prefix).clear().type(prefix);
      cy.get("#autocomplete-dropdown")
        .children()
        .each(($child, $index, $list) => {
          expect($list.length).to.be.at.most(MAX_DROPDOWN_SIZE);
          const currentElementText = $child.text().toLowerCase();
          expect(currentElementText).to.have.string(`${prefix}`); // validate that the results matches the prefix
        });
      cy.get("@BillsInput").clear();
    }
  });
});
