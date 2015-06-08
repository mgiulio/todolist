# About

An unfinished grocery-type todo-list webapp to practice some vanillaJS development.
	
# Some (ab)used techniques
	
## CSS

CSS custom properties and cascading variables.

The item status toggle checkbox is styled with an SVG icon as a css background-image, colored with CSS filters.

CSS source is (post)processing with CSSsnext.
	
## JS
		
Object.observe() is used for for custom events. No polyfill is used so it doesn't run on FF and other browsers yet.
	
## Templating	
	
handlebars.js is used for the template system.
