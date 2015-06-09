var 
	fs = require('fs'),
	cssnext = require('cssnext')
;

var input = fs.readFileSync('css/style.css', 'utf8');

var output = cssnext(input, {
	from: 'css/style.css'
	/* ,import: {
		path: ['css/']
	} */
	//,sourcemap: true
	,compress: true
});

fs.writeFileSync('style.css', output);