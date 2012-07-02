// remove address bar from settings tab
require('simple-tab').simplify('settings/index.html');

const { ChromeMod } = require("chrome-mod");
const { id, data } = require("self");
const ss = require("simple-storage");
const tabs = require("tabs");
const { name, metadata } = require('@packaging');

tabs.on("ready", function(tab) {
  // this event can be fired on any tab opened, so must filter out
  if (tab.url.indexOf('resource') == 0 && tab.url.indexOf(name) != -1) {
    worker = tab.attach({
      contentScriptFile: data.url('settings/form.js')
    });

    worker.port.on('prefs:closed', function() {
      tab.close()
    });

    worker.port.on('prefs:db:set', function(patterns) {
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
    worker.port.emit('prefs:db:set', patterns);

    worker.port.emit('prefs:metadata:set', name, metadata[name]);
  }
});


ChromeMod({
  include: "about:addons",
  contentScriptFile: data.url("settings/button.js"),
  onAttach: function(worker) {
    worker.port.emit("setup", id);
    
    worker.port.on('prefs:opened', function() {
      tabs.open(data.url('settings/index.html'))
    })
  }
});
