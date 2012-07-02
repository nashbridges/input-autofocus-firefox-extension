require("settings");

const pm = require("page-mod");
const ss = require("simple-storage");
const data = require("self").data;


var pageModsController = {
	init: function() {
		var patterns = ss.storage.patterns;
		if (patterns) {
			this.pagemods = [];

			for each (let pattern in patterns) {
				try {
          let pagemod = this.createPageMode(pattern);
  				this.pagemods.push(pagemod);
        }
        // bad pattern
        catch (e) {
          console.log(e.message)
        }
			}
		};
	},

	createPageMode: function(pattern) {
		return pm.PageMod({
			include: pattern.url,
			contentScriptWhen: "ready",
			contentScriptFile: data.url("pagemod.js"),
			onAttach: function(worker) {
				worker.port.emit("setup", pattern.selector)
			}
		})
	},

	destroy: function() {
		if (this.pagemods) {
			for each (let pagemod in this.pagemods) pagemod.destroy();
			this.pagemods = null;
		};
	}
};

pageModsController.init();

exports.reload = function() {
  pageModsController.destroy();
  pageModsController.init();
}