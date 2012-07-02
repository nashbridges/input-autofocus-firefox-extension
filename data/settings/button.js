var main = {
  setListener: function() {
    var list = document.getElementById("addon-list");
    for each (let item in list.childNodes) {
      let addon = item.mAddon;
      if (addon.id !== this.addonId)
        continue;

      // Search for the container of buttons displayed at right of the addon line
      let controlContainer = document.getAnonymousElementByAttribute(item, 'anonid', 'control-container');
      let prefButton = controlContainer.querySelector(".preferences");
      prefButton.addEventListener("click", this.onButtonClick.bind(this), false)

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