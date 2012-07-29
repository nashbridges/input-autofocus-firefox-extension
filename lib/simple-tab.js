// modified addon-page.js from standard addon package

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const { uriPrefix, name } = require('@packaging');
const { WindowTracker, isBrowser } = require('api-utils/window-utils');
const { add, remove } = require('api-utils/array');
const { getTabs, closeTab } = require('api-utils/tabs/utils');

// Note: This is an URL that will be returned by calling
// `require('self').data.url('index.html')` from the add-on modules.
// We could not use this expression as in this module it would have
// returned "addon-kit/data/index.html" instead.

exports.simplify = function (url) {
  let addonURL = uriPrefix + name + '/data/' + url;

  WindowTracker({
    onTrack: function onTrack(window) {
      if (isBrowser(window))
        add(window.XULBrowserWindow.inContentWhitelist, addonURL);
    },
    onUntrack: function onUntrack(window) {
      if (isBrowser(window))
        remove(window.XULBrowserWindow.inContentWhitelist, addonURL);
    }
  });
}