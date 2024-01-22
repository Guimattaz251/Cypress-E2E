describe("Transações", () => {
  beforeEach(() => {
    cy.visit("https://devfinance-agilizei.netlify.app/#");
  });

  it("Cadastrar uma entrada", () => {
    criarTransacao("Freela", 500);

    cy.get("tbody tr td.description").should("have.text", "Freela");
  });

  it("Cadastrar uma saída", () => {
    cy.visit("https://devfinance-agilizei.netlify.app/#");
    criarTransacao("Cinema", -50);

    cy.get("tbody tr td.description").should("have.text", "Cinema");
  });

  it("Deletar transação", () => {
    criarTransacao("Freela", 100);
    cy.contains(".description", "Freela").parent().find("img").click();
    cy.get("tbody tr").should("have.length", 0);
  });

  it("Deletar uma transação, já existindo outra", () => {
    criarTransacao("Freela", 100);
    criarTransacao("Job", 200);
    cy.contains(".description", "Freela").parent().find("img").click();
  });
});

function criarTransacao(descricao, valor) {
  cy.contains("Nova Transação").click();
  cy.get("#description").type(descricao);
  cy.get("#amount").type(valor);
  cy.get("#date").type("2024-01-05");
  cy.contains("button", "Salvar").click();
}

function deletarTransacao() {}
