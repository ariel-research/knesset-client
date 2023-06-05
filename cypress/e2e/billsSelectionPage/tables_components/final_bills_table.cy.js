/// <reference types="cypress" />

const KNESSET_NUM = "העשרים וארבע";
const MAX_ITERATIONS = 10;
const NEUTRAL_VAL = "3";
const NEUTRAL_TEXT = "נמנע";
const AGAINST_VAL = "2";
const AGAINST_TEXT = "נגד";
const FOR_VAL = "1";
const FOR_TEXT = "בעד";
const VOTES_OPTIONS = [
  { vote_text: FOR_TEXT, vote_value: FOR_VAL },
  { vote_text: AGAINST_TEXT, vote_value: AGAINST_VAL },
  { vote_text: NEUTRAL_TEXT, vote_value: NEUTRAL_VAL },
];

describe("Final Bills Table", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    //load bills to selected table
    cy.get("#knesset_num_select").select(KNESSET_NUM);
    cy.get('#add_all_bills').click();
    cy.wait(2000); //wait for bills to load
    cy.get('#bills_selection_page-load_votes_button').click();
  });

  it("remove row functionality", () => {
    let rowsOriginalSize = 0;
    // determine original total bills
    cy.get("#selected_bills-table_body")
      .children()
      .as("Rows")
      .then(($list) => {
        rowsOriginalSize = $list.length;
      });

    //iterate rows and remove bills
    for (let index = 0; index < MAX_ITERATIONS; index++) {
      cy.get(`#selected_bills-index-${index}`).click();
      cy.get("@Rows").then(($list) => {
        expect($list.length).to.be.eq(rowsOriginalSize - index - 1);
      });
    }
  });

  it("votes options validation", () => {
    for (let index = 0; index < MAX_ITERATIONS; index++) {
      cy.get(`#user_vote-${index}`).then((vote) => {
        const options = Array.from(vote[0].options); //all available options

        options.forEach((option, index) => {
          const optionValue = option.value;
          cy.get(`#user_vote-${index}`)
            .select(optionValue)
            .should("have.value", VOTES_OPTIONS[index].vote_value);
        });
      });
    }
  });

  it("select votes validation", () => {
    for (let index = 0; index < MAX_ITERATIONS; index++) {
      const currentVote = VOTES_OPTIONS[index % 3].vote_value;
      cy.get(`#user_vote-${index}`).select(currentVote);
      cy.get(`#user_vote-${index}`)
        .invoke("val")
        .then((value) => {
          expect(value).to.be.eq(currentVote);
        });
    }
  });
});
