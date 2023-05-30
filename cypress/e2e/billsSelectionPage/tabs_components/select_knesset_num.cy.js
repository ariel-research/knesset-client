/// <reference types="cypress" />

const { getBillsOfKnesset } = require("../../../../src/utils/apiUtils");

const KNESSET_NUM = 24;

describe("Select Knesset Num Bills", () => {
  before(() => {
    cy.visit("http://localhost:3000/");
  });

  it("select knesset num bills functionality", () => {
    cy.get("#tab-1_title").click(); //choose knesset num tab
    cy.get("#knesset_num_select").select(KNESSET_NUM - 1);
    cy.get("#tab-action_button").click();

    let associatedBills = [];
    // call for API for data validation
    getBillsOfKnesset(KNESSET_NUM)
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
