const data = require("sdk/self").data;
const ss = require("sdk/simple-storage");

var panel;

require("sdk/simple-prefs").on("openSettings", function() {
  if (!panel) {
    panel = require("sdk/panel").Panel({
      width: 600,
      height: 500,
      contentURL: data.url("settings/index.html"),
      contentScriptFile: data.url("settings/form.js")
    });

    panel.port.on('prefs:closed', function() {
      panel.hide()
    });

    panel.port.on('prefs:db:set', function(patterns) {
      // do not save blank selectors
      for each (let pattern in patterns) {
        if (pattern.selector.trim() == '') {
          pattern.selector = undefined;
        }
      }
      ss.storage.patterns = patterns;

      require('main').reload();
    });

    // storage -> settings form
    let patterns = ss.storage.patterns || [];
    panel.port.emit('prefs:db:set', patterns);
  }

  panel.show();
});
