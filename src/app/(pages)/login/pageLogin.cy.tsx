import React from 'react'
import Login from './page'

describe('<Login />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Login />)
  });

  it('Submits login form with valid credentials', () => {
    cy.mount(<Login />)
    cy.get('#email').type('validemail@example.com');
    cy.get('#password').type('validPassword123!');
    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Login Successful!`)
    }) 
  });

  it('Displays error message for invalid credentials', () => {
    cy.mount(<Login />)
    cy.get('#email').type('invalidemail');
    cy.get('#password').type('invalidpassword');
    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.not.equal(`Login Successful!`)
    })
  });
})