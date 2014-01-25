var table = document.querySelector('table');

// settings forms -> storage
document.querySelector('#save').addEventListener('click', function() {
  let patterns = [],
      rows = table.querySelectorAll('tr');

  for (let i=0; i<rows.length; i++) {
    let row = rows[i],
        url = row.querySelector('input.url'),
        selector = row.querySelector('input.selector');
    if (url && selector) {
      patterns.push({url: url.value, selector: selector.value})
    }
  }
  self.port.emit('prefs:db:set', patterns);

  self.port.emit('prefs:closed');
}, false);


document.querySelector('#cancel').addEventListener('click', function() {
  self.port.emit('prefs:closed')
}, false);


// Add blank row
document.querySelector('#add-row').addEventListener('click', function() {
  let row = createInputsRow();
  table.appendChild(row);

  row.querySelector('.url').focus();
}, false);


document.querySelector('#toggle-help').addEventListener('click', function(e) {
  e.preventDefault();
  this.nextElementSibling.style.display = 'block';
});


// storage -> settings forms
self.port.on('prefs:db:set', function (patterns) {
  for each (let pattern in patterns) {
    table.appendChild(createInputsRow(pattern))
  }
});


var createInputsRow = function (data) {
  if (data == undefined) data = {};

  let inputs = ['url', 'selector'].map(function (attribute) {
    return createElement("input", {
      class: attribute,
      value: data[attribute] == undefined ? '' : data[attribute]
    })
  });

  let row = document.createElement("tr");
  row.appendChild(wrapInCell(inputs[0]));
  row.appendChild(wrapInCell(inputs[1]));
  row.appendChild(wrapInCell(createRemoveButton()));

  return row;
};


var wrapInCell = function (element) {
  let cell = createElement("td");
  cell.appendChild(element);
  return cell;
}


var createRemoveButton = function () {
  let button = createElement("input", {class: "remove", type: "button", value: "x"});
  button.addEventListener('click', function () {
    // -> td -> tr -> table
    let row = this.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }, false);
  return button;
}


var createElement = function (type, attributes) {
  let element = document.createElement(type);
  if (attributes) {
    for (let prop in attributes) {
      let value = attributes[prop];
      element.setAttribute(prop, value);
    }
  }
  return element;
};
