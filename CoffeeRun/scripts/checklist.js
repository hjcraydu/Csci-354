(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  /*function changeColor(){
    document.getElementByValue("Short").style.color = 'blue';
    document.getElementByValue("Tall").style.color = 'green';
    document.getElementByValue("Grande").style.color = 'red';
    document.getElementByValue("X-Grande").style.color = 'orange';
  }*/

  CheckList.prototype.addClickHandler = function(fn) {
    this.$element.on('click', 'input', function(event) {
      var email = event.target.value;

      fn(email)
        .then(function() {
          this.removeRow(email);
        }.bind(this));
    }.bind(this));
  };

  CheckList.prototype.addRow = function(coffeeOrder) {
    // Remove any existing rows that match the email address
    this.removeRow(coffeeOrder.emailAddress);

    // Create a new instance of a row, using the coffee order info
    var rowElement = new Row(coffeeOrder);
    // Add the new row instance's $element property to the checklist



    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function(email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };

  function Row(coffeeOrder) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });


    var description = coffeeOrder.flavor + ' ';
    description += coffeeOrder.coffee + ', ';

    if (coffeeOrder.size) {
      description += coffeeOrder.size + ' ';

      switch (coffeeOrder.size) {
        case 'Short':
          $div.css("background-color", "rgb(255, 243, 134)");
          break;

        case 'Tall':
          $div.css("background-color", "rgb(130, 212, 187)");
          break;

        case 'Grande':
          $div.css('background-color', 'rgb(255, 136, 73)');
          break;

        case 'X-Grande':
          $div.css('background-color', 'rgb(125, 130, 184)');
          break;
      }
    }

    description += ' (' + coffeeOrder.emailAddress + ')';
    description += ' [' + coffeeOrder.strength + 'x]';




    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
