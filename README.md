# ajaxRoute.js

ajaxRoute.js is a pure-javascript micro-templating library based on ajax requests for template html files that can have [embedded moustache javascript](http://github.com/lukedmor/jstemplate).

It is designed to improve user experience and page load times. Content is loaded _only_ when requested, and the user is never actually leaving the page when an ajaxRoute is performed.

See the test example to learn more! You can take a look at [my website](http://lucasmorales.co) as well, which uses a slightly modified version of ajaxRoute.

## Object Argument

+ `hash`: __String__ hash location e.g. '/' for 'test.html#/'
+ `url`: __String__ path to file
+ `destination`: __String__ CSS selector for where parsed content will be placed
+ `controller`: __Object__ _optional_ contents are referenced in moustache embedded javascript
+ `callback`: __Function__(__Controller__) _optional_ runs after parsed content is placed
+ `removeActive`: __String__ _optional_ CSS selector to remove `.active` class from on route
+ `bindActive`: __String__ _optional_ Attribute name for which `.active` class will be added on route

### bindActive and removeActive

These two parameters are very useful for cases such as

```HTML
<footer index about contact>
	...
</footer>
```

Here, you could have the footer only show when on the hashes with the corresponding bindActive values. This would be implemented with `removeActive:''` on all ajaxRoutes, and `bindActive` set to the HTML attributes used (e.g. index, about, contact).