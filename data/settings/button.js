var main = {
  setListener: function() {
    var list = document.getElementById("addon-list");
    for each (let item in list.childNodes) {
      let addon = item.mAddon;
      if (addon.id !== this.addonId)
        continue;

      // Search for the container of buttons displayed at right of the addon line
      let controlContainer = document.getAnonymousElementByAttribute(item, 'anonid', 'control-container');
      
      // Insert our button only once
      if (controlContainer.querySelectorAll("button.settings").length > 0)
        break;

      let prefButton = document.createElement("button");
      prefButton.setAttribute("class", "settings");
      prefButton.setAttribute("label", "Preferences");
      prefButton.addEventListener("command", this.onButtonClick.bind(this), false);
      controlContainer.insertBefore(prefButton, controlContainer.firstChild);

      break;
    }
  },

  onButtonClick: function(event) {
    event.stopPropagation()
    event.preventDefault()
    self.port.emit('prefs:opened')
  }
}

document.addEventListener("ViewChanged", main.setListener.bind(main), true);

self.port.on("setup", function(id) {
  main.addonId = id
})