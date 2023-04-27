describe('Los estudiantes under monkeys', function () {
  it('visits los estudiantes and survives monkeys', function () {
    cy.visit('https://losestudiantes.co');
    cy.wait(2000);
    randomEvent(10);
  })
})

function randomText() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

function randomClick() {
      cy.get('a').then($links => {
        var randomLink = $links.get(getRandomInt(0, $links.length));
        if (!Cypress.dom.isHidden(randomLink)) {
          cy.wrap(randomLink).click({ force: true });
        }
      });
}


function setRandomText() {
      cy.get('input').then($inputs => {
        var randomInput = $inputs.get(getRandomInt(0, $inputs.length))
        if (!Cypress.dom.isHidden(randomInput)) {
          cy.wrap(randomInput).type(randomText(), { force: true });
        }
      })
}

function comboRandom() {
      cy.get('select').then($combos => {
        var selectedCombo = $combos.get(getRandomInt(0, $combos.length));
        if (!Cypress.dom.isHidden(selectedCombo)) {
          cy.wrap(selectedCombo).click({ force: true });
        }
      });
    }

function buttonRandom() {
      cy.get('button').then($buttons => {
        var selectedButton = $buttons.get(getRandomInt(0, $buttons.length));
        if (!Cypress.dom.isHidden(selectedButton)) {
          cy.wrap(selectedButton).click({ force: true });
        }
      });
    }

//funciton randomEvent developed by me
function randomEvent(monkeysLeft) {
  for (let i = 0; i < monkeysLeft; i++) {
    if (monkeysLeft > 0) {
      var selection = getRandomInt(1, 5)
      if (selection == 1) {
        cy.get('body').then((body) => {
          if (body.find('a').length > 0) {
            randomClick();
            cy.wait(2000);
          }
          else {
            cy.log("No existe ningún link en esta página")
            randomEvent(1);
          }
      })
    }
      else if (selection == 2) {
        cy.get('body').then((body) => {
          if (body.find('input').length > 0) {
            setRandomText();
            cy.wait(2000);
          }
          else {
            cy.log("No existe ningún input en esta página")
            randomEvent(1);
          }
        })
      }
      else if (selection == 3) {
        cy.get('body').then((body) => {
          if (body.find('select').length > 0) {
            comboRandom();
            cy.wait(2000);
          }
          else {
            cy.log("No existe ningún combo box en esta página")
            randomEvent(1);
          }
        })
      }
      else {
        cy.get('body').then((body) => {
          if (body.find('button').length > 0) {
            buttonRandom();
            cy.wait(2000);
          }
          else {
            cy.log("No existe ningún botón en esta página")
            randomEvent(1);
          }
        })
      }

    }
  }
}