describe("Navigation", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/");
    cy.contains("Monday")
  })

  it("should book an interview", () => {
    
    cy.get('img[alt="Add"]').first().click();

    cy.get('[data-testid=student-name-input]').type("Lydia Miller-Jones");
    cy.get('img[alt="Sylvia Palmer"]').click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("it should edit an interview", () => {
    
    cy.get('[alt="Edit"]').first().click({force: true});

    
    cy.get('img[alt="Tori Malcolm"]').click();
    cy.get('[data-testid=student-name-input]').clear().type("Milo Chase");

    cy.contains("Save").click();
    
    cy.contains(".appointment__card--show", "Milo Chase");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("it should cancel an interview", () => {
    
    cy.get('[alt="Delete"]').first().click({force: true});

    
    //cy.get('img[alt="Tori Malcolm"]').click();
    //cy.get('[data-testid=student-name-input]').clear().type("Milo Chase");

    cy.contains("Confirm").click();

    cy.contains("Deleting...");
    cy.contains("Deleting...").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
    //cy.contains(".appointment__card--show", "Tori Malcolm");
  });
});