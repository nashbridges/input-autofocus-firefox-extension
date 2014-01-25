var main = {
  init: function(selector) {
    if (selector) {
      this.focusByQuery(selector)
    } else {
      let defaults = [
        "input[tabIndex='1']",
        "input[type='search']",
        "input[id*='search']",
        "input[type='text']"
      ];
      for each (let selector in defaults) {
        if (this.focusByQuery(selector))
          break;
      }
    };
  },

  focusByQuery: function(query) {
    let input = document.querySelector(query);
    if (input) {
      input.focus();
      return true
    }
  }
};

self.port.on("setup", function(selector) {
  main.init(selector);
});
