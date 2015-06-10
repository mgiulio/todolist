var 
	fs = require('fs'),
	fse = require('fs-extra')
;

var 
	FILE_ENCODING = 'utf-8',
	EOL = '\n'
;

run();

function run() {
	cleanup();
	css();
	js();
	img();
	copy();
}	

function cleanup() {
	fse.emptyDirSync('dist');
	
	fs.mkdirSync('dist/css');
	fs.mkdirSync('dist/js');
	fs.mkdirSync('dist/images');
}

function css() {
	console.log('=== Processing CSS...');
	
	var cssnext = require('cssnext');

	var input = fs.readFileSync('src/css/style.css', FILE_ENCODING);
	var output = cssnext(input, {
		from: 'src/css/style.css'
		//,sourcemap: true
		//,compress: true,
	});
	fs.writeFileSync('dist/css/style.css', output);
}

function js() {
	console.log('=== Processing Js...');
	
	var 
		src = ['src/js/lib/handlebars.js', 'src/js/todos.js', 'src/js/app.js'],
		dest = 'dist/js/script.js';
	;
	
	/* concat({
		src: src, 
		dest: dest
	}); */
	
	console.log('Concatenation and minification...');
	
	var UglifyJS = require('uglify-js');
	try {
		var result = UglifyJS.minify(src, {
			outSourceMap: "script.js.map"
		});
	} catch (e) {
		console.log(e.message + ' in ' +  e.filename + ' @ ' + e.line + ':' + e.col);
		return;
	}
	
	console.log('Writing ' + dest + '...');
	fs.writeFileSync(dest, result.code);
	fs.writeFileSync(dest + '.map', result.map);
}

function concat(opts) {
	var fileList = opts.src;
	var distPath = opts.dest;

	var out = fileList.map(function(filePath){
		return fs.readFileSync(filePath, FILE_ENCODING);
	});

	fs.writeFileSync(distPath, out.join(EOL), FILE_ENCODING);
	console.log(' '+ distPath +' built.');
}

function img() {
	console.log('=== Processing images');
	
	fse.copySync('src/img', 'dist/img');
}

function copy() {
	console.log('=== Copy');
	
	fse.copySync('src/index.html', 'dist/index.html');
}
