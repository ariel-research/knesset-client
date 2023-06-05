/// <reference types="cypress" />

const { getBillsOfKnesset } = require("../../../../src/utils/apiUtils");

const KNESSET_NUM = "העשרים וארבע";
const KNESSET_NUM_VAL = 24;

describe("Select Knesset Num Bills", () => {
  before(() => {
    cy.visit("http://localhost:3000/");
  });

  it("select knesset num bills functionality", () => {
    cy.get("#knesset_num_select").select(KNESSET_NUM);
    cy.get('#add_all_bills').click();

    let associatedBills = [];
    // call for API for data validation
    getBillsOfKnesset(KNESSET_NUM_VAL)
      .then((res) => {
        const bills = res.data.bills;
        bills.forEach((bill) => {
          associatedBills.push(bill.name);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    //validate results are in the possible bills table
    cy.get("#possible_bills-table_body")
      .children()
      .each(($el) => {
        cy.wrap($el)
          .children()
          .eq(1) //the billLabel div
          .invoke("text")
          .then((text) => {
            expect(associatedBills.includes(text)).to.be.true;
          });
      });
  });
});
