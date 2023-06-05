/// <reference types="cypress" />

const { getBillsOfKnesset } = require("../../../src/utils/apiUtils");
const {
  billsSelectionHeaders,
  possibleBillsTable,
  table,
  selectedBillsTable,
  INPUT_PREFIXES,
  tabHeader,
} = require("../../headers/bills_selection_page_headers");

const KNESSET_NUM = "העשרים וארבע";
const KNESSET_NUM_VAL = 24;
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
    cy.get('#tab_title').should("contain.text", tabHeader.title);
    cy.get("#tab_description").should("contain.text", tabHeader.description);
    cy.get("#autocomplete-input")
      .invoke("attr", "placeholder")
      .should("equal", tabHeader.inputPlaceholder);
      cy.get('#add_bill').should("contain.text", tabHeader.addBillButton);
      cy.get('#add_all_bills').should("contain.text", tabHeader.addKnessetBills);


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
    ).should('be.disabled');
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
          cy.get('#add_bill').click(); // add the searched bill to the possible bills table
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

  it("load possible bills into selected table", () => {
    cy.get("#knesset_num_select").select(KNESSET_NUM);
    cy.get('#add_all_bills').click();
    cy.wait(SLEEP_TIME); // wait for bills to load up to possible table

    cy.get("#bills_selection_page-load_votes_button").click();

    cy.get("#bills_selection_page-search_button").should('be.enabled'); // only after bills are loaded in final bills table, user can search for matches

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
