/// <reference types="cypress" />

const KNESSET_NUM = 24;
const MAX_ITERATIONS = 10;

describe("Possible Table", () => {
  before(() => {
    cy.visit("http://localhost:3000/");
  });

  it("remove row functionality", () => {
    //load bills to table
    cy.get("#tab-1_title").click(); //choose knesset num tab
    cy.get("#knesset_num_select").select(KNESSET_NUM - 1);
    cy.get("#tab-action_button").click();

    let rowsOriginalSize = 0;
    // determine original total bills
    cy.get("#possible_bills-table_body")
      .children()
      .as("Rows")
      .then(($list) => {
        rowsOriginalSize = $list.length;
      });

    //iterate rows and remove bills
    for (let index = 0; index < MAX_ITERATIONS; index++) {
      cy.get("@Rows").then(($res) => {
        cy.wrap($res).as("CurrentRow");
        cy.get("@CurrentRow")
          .children()
          .eq(0) //remove button
          .click(); //trigger remove
      });
      cy.get("@Rows").then(($list) => {
        expect($list.length).to.be.eq(rowsOriginalSize - index - 1);
      });
    }
  });
});
