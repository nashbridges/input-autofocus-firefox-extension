# Input autofocus

This is the Firefox extension that sets focus to a first text input element after
page was loaded.

## Important notice!

If you find yourself constantly visiting some sites to make a search (i.e. IMDB), you are
probably not aware of that you can do it [right from the Firefox address bar](http://mzl.la/L8rNu0).
This plugin may be useful only in situations when two or more fields should be filled out (or
maybe you want to take advantage from the autocompletion feature that a site may provide).

## Configuration

The extension works on a white-list basis. This means that autoselection will occur
only on sites that you have added to the extensions rules. To do that go to the Addon page, click
on the *Preferences* button near the Input autofocus, then click on the *Add new rule* and type in
site url into *Url pattern* field.

Typically this would be enough (as extension tries to detect input fields on a page automatically),
click on *Save* button and navigate to the site to check if its working. If it doesn't, when you
have to specify CSS selector (see below) for the text input element, which has to be focused,
by typing it into *Selector* field in the existing rule.

### Url patterns

In 99% situations all you want is `*.site_url` pattern (i.e. `*.stackoverflow.com`).
Wildcard in the beginning means that autofocusing will occur on both http and https versions
of a site, but if you want to be more specific — go for it (`https://github.com`).

Unless you have provided closing slash at the end, pattern will match not only index (main) page,
but all others too on that site. For example `*.github.com` will match `https://github.com/search`
as well, while `https://github.com/` will match only `https://github.com` page.

### Selectors

It's very hard to briefly explain such extensive topic as
[CSS selectors](http://www.w3.org/TR/CSS2/selector.html), and I won't even try it. Remember, you
have to supply selector only if autodetection fails.

First of all, go to the site, right-click needed input text field and choose *Inspect element*.
If you see label like `input#query` or `input.search-box`, then you're in luck. Just retype it
into *Selector* field near appropriate url pattern in the extension preferences, and press *Save*.
If you see bare `input`, try to get help from a good-known web designer :)


## Issues

Use [Github issues](/issues) to file a ticket. I hope it will never happen though :)

## Credits

Chrome-mode and all Preference button related code is taken from <https://github.com/ochameau/locale-updater>.

## License

Copyright © 2012 Andrii Malyshko

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.