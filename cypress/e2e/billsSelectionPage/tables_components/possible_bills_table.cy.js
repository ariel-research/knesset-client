/// <reference types="cypress" />

const KNESSET_NUM = "העשרים וארבע";
const MAX_ITERATIONS = 10;

describe("Possible Bills Table", () => {
  
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    //load bills to table
    cy.get("#knesset_num_select").select(KNESSET_NUM);
    cy.get('#add_all_bills').click();
    cy.wait(2000); //wait for bills to load
  });

  it("load specific bill", () => {
    for (let index = 0; index < MAX_ITERATIONS; index++) {
      let current_id = "";
      //extract the id of the current bill
      cy.get(`#possible_bills-identifier-${index}`)
        .invoke("text")
        .then((val) => {
          current_id = val;
        });
      cy.get(`#possible_bills-action-${index}`).click(); //load bill
      //confirm the loaded bill index
      cy.get(`#selected_bills-identifier-${index}`)
        .invoke("text")
        .then((val) => {
          expect(val).to.be.eq(current_id);
        });
    }
  });

  it("remove row functionality", () => {
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
      cy.get(`#possible_bills-index-${index}`).click();
      cy.get("@Rows").then(($list) => {
        expect($list.length).to.be.eq(rowsOriginalSize - index - 1);
      });
    }
  });
});
