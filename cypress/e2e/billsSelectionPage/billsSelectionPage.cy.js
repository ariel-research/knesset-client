/// <reference types="cypress" />

const { getBillsOfKnesset } = require("../../../src/utils/apiUtils");
const {
  billsSelectionHeaders,
  tabHeader2,
  tabHeader1,
  possibleBillsTable,
  table,
  selectedBillsTable,
  INPUT_PREFIXES,
} = require("../../headers/bills_selection_page_headers");

const KNESSET_NUM = 24;
const SLEEP_TIME = 3000;

describe("bills Selection Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("UI validation", () => {
    // header check
    cy.get("#bills_selection_page-header").should(
      "contain.text",
      billsSelectionHeaders.header
    );
    cy.get("#bills_selection_page-hint").should(
      "contain.text",
      billsSelectionHeaders.hint
    );

    // tabs check
    // tab 1
    cy.get("#tab-2_title").should("contain.text", tabHeader2.title);
    cy.get("#tab_description").should("contain.text", tabHeader2.description);
    cy.get("#autocomplete-input")
      .invoke("attr", "placeholder")
      .should("equal", tabHeader2.inputPlaceholder);
    cy.get("#tab-action_button").should("contain.text", tabHeader2.button);
    //tab 2
    cy.get("#tab-1_title").should("contain.text", tabHeader1.title).click();
    cy.get("#tab_description").should("contain.text", tabHeader1.description);
    cy.get("#knesset_num_select").should("exist");
    cy.get("#tab-action_button").should("contain.text", tabHeader1.button);

    // tables check
    // possible bills
    cy.get("#bills_selection_page-possible_votes").should(
      "contain.text",
      possibleBillsTable.title
    );
    cy.get("#possible_bills-index_header").should("exist");
    cy.get("#possible_bills-identifier_header").should(
      "contain.text",
      table.identifyField
    );
    cy.get("#possible_bills-label_header").should(
      "contain.text",
      table.labelField
    );
    cy.get("#possible_bills-action_header").should("exist");
    // selected bills
    cy.get("#bills_selection_page-selected_votes").should(
      "contain.text",
      selectedBillsTable.title
    );
    cy.get("#selected_bills-index_header").should("exist");
    cy.get("#selected_bills-identifier_header").should(
      "contain.text",
      table.identifyField
    );
    cy.get("#selected_bills-label_header").should(
      "contain.text",
      table.labelField
    );
    cy.get("#selected_bills-action_header").should("exist");

    //action buttons
    cy.get("#bills_selection_page-load_votes_button").should(
      "contain.text",
      billsSelectionHeaders.loadBillsButton
    );
    cy.get("#bills_selection_page-search_button").should(
      "contain.text",
      billsSelectionHeaders.searchButton
    );
    cy.get("#bills_selection_page-left_arrow").should("exist");
  });

  it("Load free text searched bills", () => {
    cy.wait(SLEEP_TIME); //wait for results to load up
    let searchedBills = [];
    for (const prefix of INPUT_PREFIXES) {
      cy.get("#autocomplete-input").as("BillsInput").type(prefix); //search for bills
      cy.get("#autocomplete-dropdown")
        .children()
        .then(($res) => {
          cy.wrap($res[0])
            .invoke("text")
            .then((text) => {
              searchedBills.push(text);
            });
          $res[0].click(); //load the selected to the input field
          cy.get("#tab-action_button").click(); // add the searched bill to the possible bills table
        });
      cy.get("@BillsInput").clear();
    }

    //validate results are in the possible bills table
    cy.get("#possible_bills-table_body")
      .children()
      .each(($el) => {
        cy.wrap($el)
          .children()
          .eq(1) //the billLabel div
          .invoke("text")
          .then((text) => {
            expect(searchedBills.includes(text)).to.be.true;
          });
      });
  });

  it("Load associated knesset num bills", () => {
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

  it.only("load possible bills into selected table", () => {
    cy.get("#tab-1_title").click(); //choose knesset num tab
    cy.get("#knesset_num_select").select(KNESSET_NUM - 1);
    cy.get("#tab-action_button").click();
    cy.wait(SLEEP_TIME); // wait for bills to load up to possible table
    cy.get("#bills_selection_page-load_votes_button").click();

    const possibleBills = [];
    cy.get("#possible_bills-table_body")
      .children()
      .each(($el) => {
        cy.wrap($el)
          .children()
          .eq(1) //the billLabel div
          .invoke("text")
          .then((text) => {
            possibleBills.push(text);
          });
      });

    const selectedBills = [];
    cy.get("#selected_bills-table_body")
      .children()
      .each(($el) => {
        cy.wrap($el)
          .children()
          .eq(1) //the billLabel div
          .invoke("text")
          .then((text) => {
            selectedBills.push(text);
          });
      });

    const compareTables = possibleBills.every((label) =>
      selectedBills.includes(label)
    );
    expect(compareTables).to.be.true;
  });
});
