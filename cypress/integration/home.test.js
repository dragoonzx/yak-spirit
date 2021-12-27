describe('Yak Spirit Home', () => {
  beforeEach(() => cy.visit('/'));

  it('loads page', () => {
    cy.get('#yak-home');
  });

  it('displays YAK - PNG pair by default', () => {});

  it('displays exchange routing for YAK - PNG pair by default', () => {});

  it('displays table of exchanges by default', () => {});
});
